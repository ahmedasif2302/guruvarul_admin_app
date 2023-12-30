import { Button, Card, Col, Row, Select, Space, Table, DatePicker, Radio, Skeleton } from 'antd'
import { useFormik } from 'formik';
import "./style.css"
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { deleteConfirmationModal, submitConfirmationModal } from '../../components/confirmModal/confirmModal';
import BaseIcon from '../../components/icon/BaseIcon'
import CustomTable from '../../components/table/CustomTable';
import { errorToastr } from '../../components/toastr/Toastr';
import { PRIORITY_ARRAY, STATUS, TODO_LIMIT } from '../../Utils/constants';
import { taskValidation } from '../../Utils/formValidation';
import { isValidArray, isValidElement, priorityColor } from '../../Utils/helpers';
import { fetchActiveCategories } from '../categories/CategorySlice';
import { fetchActiveProperties } from '../property/propertySlice';
import CompleteTodoForm from './component/CompleteTodoForm';
import ExportForm from './component/ExportForm';
import TodoForm from './component/TodoForm';
import { deleteTodo, fetchTasks, updateTodo, resetTaskState } from './TodoSlice';
import { useHistory } from "react-router-dom";
const { Option } = Select;
const { RangePicker } = DatePicker;
export default function Todos() {
    const dispatch = useDispatch();
    const history = useHistory()

    const activeCategories = useSelector(state => state.category.activeCategories);
    const activeProperties = useSelector(state => state.property.activeProperties);

    const { tasks, loading, error, total } = useSelector((state) => ({
        tasks: state.tasks.tasks,
        loading: state.tasks.loading,
        error: state.tasks.error,
        total: state.tasks.total
    }));

    const [isTodoModal, setIsTodoModal] = useState(false);
    const [isExportModal, setIsExportModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isCompleteModal, setIsCompleteModal] = useState(false);
    const [completedTodo, setCompletedTodo] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(TODO_LIMIT);
    const [status, setStatus] = useState(STATUS.PENDING);
    const [propertyId, setPropertyId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [priority, setPriority] = useState("");

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            isActive: true,
            priority: null,
            remarks: '',
            propertyId: null,
            categoryId: null,
            status: STATUS.PENDING,
            targetDate: moment(),
            log: ''
        },
        validationSchema: Yup.object(taskValidation),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    async function initCall() {
        await dispatch(fetchActiveProperties(""));
        await dispatch(fetchActiveCategories(""));
    }

    async function taskInit() {
        let filter = {}
        if (!!status) {
            filter['status'] = status
        }
        if (!!propertyId) {
            filter['propertyId'] = propertyId
        }
        if (!!categoryId) {
            filter['categoryId'] = categoryId
        }
        if (!!priority) {
            filter['priority'] = priority
        }
        await dispatch(fetchTasks({ page, limit, filter }))
    }

    useEffect(() => {
        initCall();
        taskInit();
        return function cleanUp() {
            dispatch(resetTaskState())
        }
    }, [page, limit, status, propertyId, categoryId, priority]);

    const pageHandler = (page, pageSize) => {
        setPage(page);
        setLimit(pageSize);
    };
    const onClosePropertyModal = useCallback(() => {
        setIsTodoModal(false);
        setIsEdit(false);
        setIsCompleteModal(false);
        formik.resetForm();
        setCompletedTodo(null);
        setIsExportModal(false)
    }, [isEdit, isTodoModal, isExportModal, formik]);

    const togglePropertyModal = useCallback(() => {
        setIsTodoModal(!isTodoModal)
    }, [isTodoModal]);

    const editHandler = (data) => {
        formik.setValues({ ...data });
        formik.setFieldValue('targetDate', moment(data.targetDate))
        setIsTodoModal(true);
        setIsEdit(true)
    };

    const deleteHandler = (id) => {
        if (id) {
            deleteConfirmationModal({
                title: 'Tasks',
                content: 'Are you sure you want to delete',
                onOkHandler: () => {
                    dispatch(deleteTodo(id))
                        .then(res => {
                            taskInit()
                        })
                },
                onCancelHandler: () => { }
            })
        } else {
            return errorToastr("Tasks", "Something went wrong, please try again", 2000)
        }
    }

    const onCompletedToPendingHandler = (record) => {
        // @ts-ignore
        dispatch(updateTodo({
            data: {
                status: STATUS.PENDING,
                id: record?.id
            }
        }))
            .then((res) => {
                let filter = {};
                filter['status'] = status
                // @ts-ignore
                dispatch(fetchTasks({ page: 1, limit: 10, filter }))
            });
    }

    const columns = [
        {
            title: "Property Name",
            dataIndex: "propertyName",
            key: "propertyName",
            render: (text, record) => {
                return <span>{record.property.propertyName}</span>
            }
        },
        {
            title: "Category Name",
            dataIndex: "categoryName",
            key: "categoryName",
            render: (text, record) => {
                return <span>{record.category.categoryName}</span>
            }
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Created Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text, record) => {
                return (
                    <span>{moment(text).format("DD-MM-YYYY")}</span>
                )
            }
        },
        {
            title: "Target Date",
            dataIndex: "targetDate",
            key: "targetDate",
            render: (text, record) => {
                return (
                    <span>{moment(text).format("DD-MM-YYYY")}</span>
                )
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            align: 'center',
            render: (text, record) => {
                return <BaseIcon color={text === "PENDING" ? "red" : "green"} iconName={text === "COMPLETED" ? "fas fa-check" : "fas fa-times"} />
            }
        },
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            align: 'center',
            render: (text, record) => {
                return (
                    <span style={{ color: priorityColor(text) }}>{text.toUpperCase()}</span>
                )
            }
        },

        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => {
                return (
                    <Space>
                        <a href='#!' onClick={(e) => {
                            e.preventDefault();
                            editHandler(JSON.parse(JSON.stringify(record)))
                        }}>
                            <BaseIcon iconName="fas fa-edit" size={16} color="#A9A9A9" />
                        </a>
                        {status === STATUS.PENDING && (<a href='#!' onClick={(e) => {
                            e.preventDefault();
                            setIsCompleteModal(true);
                            setCompletedTodo(JSON.parse(JSON.stringify(record)))
                        }}>
                            <BaseIcon iconName="far fa-check-circle" size={16} color="green" />
                        </a>)}
                        {status === STATUS.COMPLETED && (<a href='#!' onClick={(e) => {
                            e.preventDefault();
                            if (record?.status === STATUS.PENDING) {
                                setIsCompleteModal(true);
                                setCompletedTodo(JSON.parse(JSON.stringify(record)))
                            } else {
                                submitConfirmationModal({
                                    title: 'Revert Status',
                                    content: 'Do you want to move this task to pending?',
                                    onCancelHandler: () => { },
                                    onOkHandler: () => onCompletedToPendingHandler(record)
                                })
                            }
                        }}>
                            <BaseIcon iconName="far fa-check-circle" size={16} color="red" />
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
        },
    ];

    if (status === STATUS.COMPLETED) {
        columns.splice(5, 1, {
            title: "Completed Date",
            dataIndex: "completedTime",
            key: "completedTime",
            render: (text, record) => {
                return (
                    <span>{text ? moment(text).format("DD-MM-YYYY") : null}</span>
                )
            }
        })
    }

    const onSelectHandler = (value, type) => {
        if (type === 'property') {
            setPropertyId(value)
        } else if (type === 'category') {
            setCategoryId(value)
        } else if (type === 'priority') {
            setPriority(value)
        }
        setPage(1);
        setLimit(TODO_LIMIT);
    }

    const renderCardFilter = () => {
        return (
            <Row>
                <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Select
                        allowClear
                        onChange={(value) => onSelectHandler(value, 'property')}
                        placeholder="Select property"
                        style={{ width: 200 }}
                    >
                        {isValidArray(activeProperties) && activeProperties.map((property, index) => {
                            return (
                                <Option value={property.id}>{property.propertyName}</Option>
                            )
                        })}
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Select
                        allowClear
                        onChange={(value) => onSelectHandler(value, 'category')}
                        placeholder="Select category"
                        style={{ width: 200 }} >
                        {isValidArray(activeCategories) && activeCategories.map((category, index) => {
                            return (
                                <Option value={category.id}>{category.categoryName}</Option>
                            )
                        })}
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                    <Select
                        allowClear
                        onChange={(value) => onSelectHandler(value, 'priority')}
                        placeholder="Select priority"
                        style={{ width: 200 }} >
                        {isValidArray(PRIORITY_ARRAY) && PRIORITY_ARRAY.map((priority, index) => {
                            return (
                                <Option value={priority.value}>{priority.label}</Option>
                            )
                        })}
                    </Select>
                </Col>
            </Row >
        )
    };
    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs={24} xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Tasks"
                            extra={
                                <Space>
                                    <Button onClick={() => togglePropertyModal()} type="primary">ADD NEW TASK</Button>
                                    <Button onClick={() => history.push('/reports')} type="primary">REPORTS</Button>
                                </Space>
                            } />
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title={renderCardFilter()}
                            extra={
                                <>
                                    <Radio.Group onChange={(e) => {
                                        e.preventDefault()
                                        setStatus(e.target.value)
                                    }}
                                        defaultValue={status}
                                    >
                                        <Radio.Button value={STATUS.PENDING}>Pending</Radio.Button>
                                        <Radio.Button value={STATUS.COMPLETED}>Completed</Radio.Button>
                                    </Radio.Group>
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Skeleton loading={loading}>
                                    <CustomTable
                                        columns={columns}
                                        dataSource={tasks}
                                        pagination={{
                                            total: total,
                                            current: page,
                                            pageSize: limit,
                                            onChange: pageHandler,
                                        }}
                                        rowClassName={(record, index) => (moment(record.targetDate) <= moment() && status === STATUS.PENDING) ? 'table-row-light' : 'table-row-dark'}
                                        style={{ marginBottom: 20 }}
                                    />
                                </Skeleton>
                            </div>
                        </Card>

                    </Col>
                </Row>
            </div>

            {isTodoModal && <TodoForm
                onCloseModal={onClosePropertyModal}
                isTodoModal={isTodoModal}
                edit={isEdit}
                formik={formik}
                page={page}
                limit={limit}
                status={status}
                propertyId={propertyId}
                categoryId={categoryId}
                priority={priority}
            />}
            {isCompleteModal && <CompleteTodoForm
                status={status}
                onCloseModal={onClosePropertyModal}
                completedTodo={completedTodo}
                isCompleteModal={isCompleteModal}
            />}
            {isExportModal && <ExportForm
                onCloseModal={onClosePropertyModal}
                isExportModal={isExportModal}
            />}
        </>
    )
}
