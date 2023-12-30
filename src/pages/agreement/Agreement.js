import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Button, Row, Space, Skeleton } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import moment from 'moment';
import AgreementForm from './component/AgreementForm';
import BaseIcon from '../../components/icon/BaseIcon';
import CustomTable from '../../components/table/CustomTable';
import { agreementValidation, closeAgreementValidation } from '../../Utils/formValidation';
import { deleteConfirmationModal } from '../../components/confirmModal/confirmModal';
import { errorToastr } from '../../components/toastr/Toastr';
import { fetchActiveProperties } from '../property/propertySlice';
import { deleteAgreement, fetchAgreements } from './AgreementSlice';

export default function Agreement() {
  const dispatch = useDispatch();

  const { loading, agreements, total } = useSelector((state) => ({
    loading: state.agreements.loading,
    agreements: state.agreements.agreements,
    total: state.agreements.total
  }));

  const [isAgreementModal, setIsAgreementModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isCloseAgreementModal, setIsCloseAgreementModal] = useState(false)

  const formik = useFormik({
    initialValues: {
      staffName: '',
      unit: '',
      fromDate: moment(),
      endDate: null,
      isActive: true
    },
    validationSchema: Yup.object(isAgreementModal ? agreementValidation : closeAgreementValidation),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  async function initCall() {
    await dispatch(fetchActiveProperties(""));
  };

  async function getCall() {
    await dispatch(fetchAgreements({ page, limit }))
  }

  useEffect(() => {
    initCall();
    getCall();
  }, [page, limit]);

  const pageHandler = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };

  const onClosePropertyModal = useCallback(() => {
    setIsAgreementModal(false);
    setIsEdit(false);
    formik.resetForm();
    setIsCloseAgreementModal(false);
  }, [isEdit, isAgreementModal]);

  const toggleAgreementModal = useCallback(() => {
    setIsAgreementModal(!isAgreementModal)
  }, []);

  const editHandler = (data, type) => {
    formik.setValues({ ...data });
    formik.setFieldValue('fromDate', moment(data.fromDate));
    if (!!data?.endDate) {
      formik.setFieldValue('endDate', moment(data.endDate));
    }
    setIsEdit(true);
    if (type == 'edit') {
      setIsAgreementModal(true);
    } else {
      setIsCloseAgreementModal(true)
    }
  };

  const deleteHandler = (id) => {
    if (id) {
      deleteConfirmationModal({
        title: 'Agreement',
        content: 'Are you sure you want to delete',
        onOkHandler: () => {
          dispatch(deleteAgreement(id))
            .then(res => {
              getCall()
            })
        },
        onCancelHandler: () => { }
      })
    } else {
      return errorToastr("Agreement", "Something went wrong, please try again", 2000)
    }
  }

  const column = [
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
      render: (text, row) => {
        return <span>{row?.property?.propertyName}</span>
      }
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      key: "staffName",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "From Date",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (text, row) => {
        return <span>{moment(text).format("DD-MM-YYYY")}</span>
      }
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text, row) => {
        return (
          <>
            {!!row?.endDate ? <span>{moment(row?.endDate).format("DD-MM-YYYY")}</span> : <span>No Date</span>}
          </>
        )
      }
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      align: 'center',
      render: (text, row) => {
        return <BaseIcon color={!row?.isActive ? "red" : "green"} iconName={row?.isActive ? "fas fa-check" : "fas fa-times"} />
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
              editHandler(JSON.parse(JSON.stringify(record)), 'edit');
            }}>
              <BaseIcon iconName="fas fa-edit" size={16} color="#A9A9A9" />
            </a>
            {record?.isActive && (<a href='#!' onClick={(e) => {
              e.preventDefault();
              editHandler(JSON.parse(JSON.stringify(record)), 'close');
            }}>
              <BaseIcon iconName="far fa-file" size={16} color="#A9A9A9" />
            </a>)}
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
              title="Agreement"
              extra={
                <>
                  <Button onClick={toggleAgreementModal} type="primary">ADD NEW AGREEMENT</Button>
                </>
              }
            >
              <div className="table-responsive">
                <Skeleton loading={loading}>
                  <CustomTable
                    columns={column}
                    dataSource={agreements}
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
        {(isAgreementModal || isCloseAgreementModal) && <AgreementForm
          formik={formik}
          onCloseModal={onClosePropertyModal}
          isAgreementModal={isAgreementModal}
          isCloseAgreementModal={isCloseAgreementModal}
          edit={isEdit}
        />}
      </div>
    </>
  )
}
