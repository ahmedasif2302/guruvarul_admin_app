import { Form, Input, Select } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomError from '../../../components/error/CustomError';
import CustomModal from '../../../components/modal/CustomModal';
import { PRIORITY_ARRAY, STATUS } from '../../../Utils/constants';
import * as Yup from 'yup';
import { exportTodo, fetchReports, fetchTasks, updateTodo } from '../TodoSlice';
import { errorToastr } from '../../../components/toastr/Toastr';
import { isValidArray } from '../../../Utils/helpers';
import { exportFormValidation } from '../../../Utils/formValidation';

const { Option } = Select;
export default function ExportForm(props) {
    const dispatch = useDispatch();
    const { isExportModal, onCloseModal } = props;

    const activeCategories = useSelector(state => state.category.activeCategories);
    const activeProperties = useSelector(state => state.property.activeProperties);
    const crudLoading = useSelector(state => state.tasks.crudLoading);

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
        return () => {
            onCancelHandler();
            formik.resetForm()
        }
    }, [])

    const onOkHandler = () => {
        if (!formik.values.page || !formik.values.limit) {
            return errorToastr("Export", "Page or limit is required", 2000)
        }
        dispatch(exportTodo({ data: formik.values }))
            .then((res) => {
                dispatch(fetchReports({ page: 1, limit: 10 }));
                onCloseModal()
            });
    };

    const onCancelHandler = () => {
        return onCloseModal()
    };


    const onSelectHandler = useCallback((field, value) => {
        formik.setFieldValue(field, value)
    }, []);

    return (
        <CustomModal
            buttonText={"Export"}
            open={isExportModal}
            title={"Export To Excel"}
            onOk={onOkHandler}
            onCancel={onCancelHandler}
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
                    label="Select Priority"
                >
                    <Select
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
                    label="Select Status"
                >
                    <Select
                        placeholder="Select status"
                        value={formik.values.status}
                        optionFilterProp="children"
                        onBlur={formik.handleBlur}
                        onChange={(value) => onSelectHandler("status", value)}
                    >
                        <Option value={STATUS.COMPLETED}>Completed</Option>
                        <Option value={STATUS.PENDING}>Pending</Option>
                    </Select>
                </Form.Item>
            </Form>
        </CustomModal>
    )
}
