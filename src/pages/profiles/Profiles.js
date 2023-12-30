import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Button, Row, Table, Space, Skeleton } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BaseIcon from '../../components/icon/BaseIcon';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../components/table/CustomTable';
import { propertyValidation } from '../../Utils/formValidation';
import { deleteConfirmationModal } from '../../components/confirmModal/confirmModal';
import { errorToastr } from '../../components/toastr/Toastr';

export default function Profiles() {
    const dispatch = useDispatch();

    const { loading, properties, total } = useSelector((state) => ({
        loading: state.property.loading,
        properties: state.property.properties,
        total: state.property.total
    }));

    const [isPropertyModal, setIsPropertyModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const formik = useFormik({
        initialValues: {
            name: '',
            isActive: true
        },
        validationSchema: Yup.object(propertyValidation),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => {

    }, [page, limit]);

    const pageHandler = (page, pageSize) => {
        setPage(page);
        setLimit(pageSize);
    };

    const onClosePropertyModal = useCallback(() => {
        setIsPropertyModal(false);
        setIsEdit(false);
        formik.resetForm()
    }, [isEdit, isPropertyModal, formik]);

    const togglePropertyModal = useCallback(() => {
        setIsPropertyModal(!isPropertyModal)
    }, [isPropertyModal]);

    const editHandler = (data) => {
        formik.setValues({ ...data });
        setIsPropertyModal(true);
        setIsEdit(true)
    };

    const deleteHandler = (id) => {
        if (id) {
            deleteConfirmationModal({
                title: 'Profiles',
                content: 'Are you sure you want to delete',
                onOkHandler: () => {

                },
                onCancelHandler: () => { }
            })
        } else {
            return errorToastr("Profiles", "Something went wrong, please try again", 2000)
        }
    }

    const column = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
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
                            deleteHandler(record.id);
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
                            title="Profiles"
                        >
                            <div className="table-responsive">
                                <Skeleton loading={loading}>
                                    <CustomTable
                                        columns={column}
                                        dataSource={properties}
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
            </div>
        </>
    )
}
