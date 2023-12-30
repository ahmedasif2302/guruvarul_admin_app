import React, { useCallback, useEffect, useState } from 'react'
import { Card, Col, Button, Row, Table, Space, Skeleton } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import BaseIcon from '../../components/icon/BaseIcon';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../components/table/CustomTable';
import { STATUS } from '../../Utils/constants';
import { fetchReports, resetTaskState, deleteExport } from '../todos/TodoSlice';
import ExportForm from '../todos/component/ExportForm';
import { errorToastr } from '../../components/toastr/Toastr';

export default function Reports() {
    const dispatch = useDispatch();

    const { reports, loading, total } = useSelector((state) => ({
        reports: state.tasks.reports,
        loading: state.tasks.loading,
        total: state.tasks.total,
    }));

    const [isExportModal, setIsExportModal] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const formik = useFormik({
        initialValues: {
            status: STATUS.COMPLETED,
            categoryId: null,
            propertyId: null,
            priority: null,
            page: 1,
            limit: 1000
        },
        validationSchema: Yup.object({}),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => {
        dispatch(fetchReports({ page, limit }));
        return function cleanUp() {
            dispatch(resetTaskState())
        }
    }, [page, limit]);

    const pageHandler = (page, pageSize) => {
        setPage(page);
        setLimit(pageSize);
    };

    const onCloseExportModal = useCallback(() => {
        setIsExportModal(false);
        formik.resetForm()
    }, [isExportModal]);

    const toggleExportModal = useCallback(() => {
        setIsExportModal(!isExportModal)
    }, [isExportModal]);

    const column = [
        {
            title: "File Name",
            dataIndex: "name",
            key: "name",
            width: "35%",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            width: "35%",
            render: (text, record) => {
                return <span>{moment(text).format("DD-MM-YYYY HH:mm a")}</span>
            }
        },
        {
            title: "Actions",
            key: "ations",
            render: (text, record) => {
                return (
                    <Space>
                        {record.fileUrl && (<a href={`https://peer.leafandberrys.com/${record.fileUrl}`} target="_blank">
                            <BaseIcon iconName="fas fa-download" size={16} color="#A9A9A9" />
                        </a>)}
                        {record.fileUrl && (<a href='!#' onClick={(e) => {
                            e.preventDefault();
                            if (!record.id) {
                                return errorToastr("Reports", "Something went wrong!", 2000)
                            }
                            dispatch(deleteExport(record.id))
                                .then(res => {
                                    dispatch(fetchReports({ page, limit }));
                                })
                        }}>
                            <BaseIcon iconName="fas fa-trash" size={16} color="#A9A9A9" />
                        </a>)}
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
                            title="Reports"
                            extra={
                                <>
                                    <Button onClick={toggleExportModal} type="primary">EXPORT EXCEL</Button>
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Skeleton loading={loading}>
                                    <CustomTable
                                        columns={column}
                                        dataSource={reports}
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
                {isExportModal && (
                    <ExportForm
                        onCloseModal={onCloseExportModal}
                        isExportModal={isExportModal}
                    />
                )}
            </div>
        </>
    )
}
