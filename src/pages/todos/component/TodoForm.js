import { Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomError from '../../../components/error/CustomError';
import CustomModal from '../../../components/modal/CustomModal';
import { PRIORITY_ARRAY } from '../../../Utils/constants';
import { isValidArray } from '../../../Utils/helpers';
import { addTodo, fetchTasks, updateTodo } from '../TodoSlice';

const { Option } = Select;
const { TextArea } = Input;
export default function TodoForm(props) {
    let previousLength = 0;
    const dispatch = useDispatch()
    const { formik, isTodoModal, onCloseModal, edit, page, limit, status, propertyId, categoryId, priority } = props;

    const activeCategories = useSelector(state => state.category.activeCategories);
    const activeProperties = useSelector(state => state.property.activeProperties);

    const { crudLoading } = useSelector((state) => ({
        crudLoading: state.tasks.crudLoading
    }))

    const onOkHandler = () => {
        let filter = {};
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
        if (edit) {
            dispatch(updateTodo({ data: formik.values }))
                .then((res) => {
                    dispatch(fetchTasks({ page, limit, filter }))
                    onCloseModal()
                })
        } else {
            dispatch(addTodo({ data: formik.values }))
                .then((res) => {
                    dispatch(fetchTasks({ page: 1, limit: 10, filter }))
                    onCloseModal()
                })
        }
    };

    const onCancelHandler = () => {
        return onCloseModal()
    };

    const onSelectHandler = useCallback((field, value) => {
        formik.setFieldValue(field, value)
    }, []);

    const onDateHanlder = (date, dateString, field) => {
        formik.setFieldValue(field, date)
    };


    const handleInput = (event) => {
        const bullet = "\u2022 " + moment().format("DD-MM-YYYY HH:mm a") + " -";
        const newLength = event.target.value.length;
        const characterCode = event.target.value.substr(-1).charCodeAt(0);

        if (newLength > previousLength) {
            if (characterCode === 10) {
                event.target.value = `${event.target.value}${bullet} `;
            } else if (newLength === 1) {
                event.target.value = `${bullet} ${event.target.value}`;
            }
        }

        previousLength = newLength;
    }

    return (
        <CustomModal
            open={isTodoModal}
            title={edit ? "Edit Task" : "New Task"}
            onOk={onOkHandler}
            onCancel={onCancelHandler}
            okButtonDisabled={!(formik.isValid && formik.dirty)}
            buttonLoading={crudLoading}
        >
            <Form
                layout="vertical"
                className="row-col"
            >
                <Form.Item
                    label="Select Property"
                >
                    <Select
                        name="propertyId"
                        placeholder="Select property"
                        value={formik.values.propertyId}
                        optionFilterProp="children"
                        onBlur={formik.handleBlur}
                        onChange={(value) => onSelectHandler("propertyId", value)}
                    >
                        {isValidArray(activeProperties) && activeProperties.map((property, index) => {
                            return (
                                <Option value={property.id}>{property.propertyName}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Select Category"
                >
                    <Select
                        placeholder="Select category"
                        value={formik.values.categoryId}
                        optionFilterProp="children"
                        onBlur={formik.handleBlur}
                        onChange={(value) => onSelectHandler("categoryId", value)}
                    >
                        {isValidArray(activeCategories) && activeCategories.map((category, index) => {
                            return (
                                <Option value={category.id}>{category.categoryName}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Title"
                >
                    <Input
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Category Name"
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <CustomError error={formik.errors.title} />
                    ) : null}
                </Form.Item>
                <Form.Item
                    label="Task Description"
                >
                    <TextArea
                        placeholder="Task Description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={4}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <CustomError error={formik.errors.description} />
                    ) : null}
                </Form.Item>
                <Form.Item
                    label="Task Events"
                >
                    <TextArea
                        onInput={handleInput}
                        placeholder="Task Events"
                        name="log"
                        value={formik.values.log}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={4}
                    />
                    {formik.touched.log && formik.errors.log ? (
                        <CustomError error={formik.errors.log} />
                    ) : null}
                </Form.Item>
                <Form.Item
                    label="Select Priority"
                >
                    <Select
                        name="priority"
                        placeholder="Select Priority"
                        value={formik.values.priority}
                        optionFilterProp="children"
                        onBlur={formik.handleBlur}
                        onChange={(value) => onSelectHandler("priority", value)}
                    >
                        {isValidArray(PRIORITY_ARRAY) && PRIORITY_ARRAY.map((property, index) => {
                            return (
                                <Option value={property.value}>{property.label}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Target Date"
                >
                    <DatePicker
                        name='targetDate'
                        placeholder="Target date"
                        format="DD-MM-YYYY"
                        allowClear={false}
                        value={formik.values.targetDate}
                        onChange={(date, dateString) => onDateHanlder(date, dateString, "targetDate")}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </Form>
        </CustomModal>
    )
}
