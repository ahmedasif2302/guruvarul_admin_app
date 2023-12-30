import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Button, Row, Space, Skeleton } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import CategoryForm from './component/CategoryForm';
import BaseIcon from '../../components/icon/BaseIcon';
import CustomTable from '../../components/table/CustomTable';
import { categoryValidation } from '../../Utils/formValidation';
import { deleteCategory, fetchCategories } from './CategorySlice';
import { deleteConfirmationModal } from '../../components/confirmModal/confirmModal';
import { errorToastr } from '../../components/toastr/Toastr';

export default function Categories() {
  const dispatch = useDispatch();

  const { loading, categories, total } = useSelector((state) => ({
    loading: state.category.loading,
    categories: state.category.categories,
    total: state.category.total
  }));

  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const formik = useFormik({
    initialValues: {
      categoryName: '',
      isActive: true
    },
    validationSchema: Yup.object(categoryValidation),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    dispatch(fetchCategories({ page, limit }));
  }, [page, limit]);

  const pageHandler = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };

  const onClosePropertyModal = useCallback(() => {
    setIsCategoryModal(false);
    setIsEdit(false);
    formik.resetForm()
  }, [isEdit, isCategoryModal]);

  const toggleCategoryModal = useCallback(() => {
    setIsCategoryModal(!isCategoryModal)
  }, [isCategoryModal]);

  const editHandler = (data) => {
    formik.setValues({ ...data });
    setIsCategoryModal(true);
    setIsEdit(true)
  };

  const deleteHandler = (id) => {
    if (id) {
      deleteConfirmationModal({
        title: 'Categories',
        content: 'Are you sure you want to delete',
        onOkHandler: () => {
          dispatch(deleteCategory(id))
            .then(res => {
              dispatch(fetchCategories({ page, limit }));
            })
        },
        onCancelHandler: () => { }
      })
    } else {
      return errorToastr("Categories", "Something went wrong, please try again", 2000)
    }
  }

  const column = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      width: "32%",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: "32%",
      align: 'center',
      render: (text, record) => {
        return (
          <BaseIcon iconName={text ? "fas fa-check" : "fas fa-times"} color={!text ? "red" : "green"} />
        )
      }
    },
    {
      title: "Actions",
      key: "ations",
      render: (text, record) => {
        return (
          <Space>
            <a href='#!' onClick={(e) => {
              e.preventDefault();
              editHandler(JSON.parse(JSON.stringify(record)))
            }}>
              <BaseIcon iconName="fas fa-edit" size={16} color="#A9A9A9" />
            </a>
            <a href='#!' onClick={(e) => {
              e.preventDefault();
              deleteHandler(record.id)
            }}>
              <BaseIcon iconName="fas fa-trash" size={16} color="red" />
            </a>
          </Space>
        )
      }
    }
  ];

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Categories"
              extra={
                <>
                  <Button onClick={toggleCategoryModal} type="primary">ADD NEW CATEGORY</Button>
                </>
              }
            >
              <div className="table-responsive">
                <Skeleton loading={loading}>
                  <CustomTable
                    columns={column}
                    dataSource={categories}
                    pagination={{
                      total: total,
                      current: page,
                      pageSize: limit,
                      onChange: pageHandler,
                    }}
                  />
                </Skeleton>
              </div>
            </Card>
          </Col>
        </Row>
        {isCategoryModal && <CategoryForm
          formik={formik}
          onCloseModal={onClosePropertyModal}
          isCategoryModal={isCategoryModal}
          edit={isEdit}
        />}
      </div>
    </>
  )
}
