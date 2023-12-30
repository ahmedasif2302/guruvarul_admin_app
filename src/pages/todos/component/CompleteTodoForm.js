import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React from 'react'
import { useDispatch } from 'react-redux';
import CustomError from '../../../components/error/CustomError';
import CustomModal from '../../../components/modal/CustomModal';
import { STATUS } from '../../../Utils/constants';
import * as Yup from 'yup';
import { fetchTasks, updateTodo } from '../TodoSlice';
import { errorToastr } from '../../../components/toastr/Toastr';

const { TextArea } = Input;
export default function CompleteTodoForm(props) {
    const dispatch = useDispatch();
    const { isCompleteModal, onCloseModal, completedTodo, status } = props;

    const formik = useFormik({
        initialValues: {
            id: !!completedTodo ? completedTodo?.id : '',
            remarks: '',
            status: STATUS.COMPLETED,
            completedTime: moment()
        },
        validationSchema: Yup.object({}),
        onSubmit: (values) => {
            console.log(values);
        },
    })

    const onOkHandler = () => {
        if (!formik.values.id) {
            onCloseModal();
            return errorToastr('Tasks', 'Something went wrong, please reload and try again', 2000);
        }
        dispatch(updateTodo({ data: formik.values }))
            .then((res) => {
                let filter = {};
                filter['status'] = status
                dispatch(fetchTasks({ page: 1, limit: 10, filter }))
                onCloseModal()
            });
    };

    const onCancelHandler = () => {
        return onCloseModal()
    };

    const renderModalForPending = () => {
        return (
            <>
                {!!completedTodo.category.categoryName && <Form.Item label="Category Name">
                    <span>{completedTodo.category.categoryName}</span>
                </Form.Item>}
                {!!completedTodo.property.propertyName && <Form.Item label="Property Name">
                    <span>{completedTodo.property.propertyName}</span>
                </Form.Item>}
                <Form.Item
                    label="Remarks"
                >
                    <TextArea
                        placeholder="Remarks"
                        name="remarks"
                        value={formik.values.remarks}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={4}
                    />
                    {formik.touched.remarks && formik.errors.remarks ? (
                        <CustomError error={formik.errors.remarks} />
                    ) : null}
                </Form.Item>
            </>
        )
    };

    return (
        <CustomModal
            buttonText={"Complete"}
            open={isCompleteModal}
            title={"Complete Task"}
            onOk={onOkHandler}
            onCancel={onCancelHandler}
        >
            <Form
                layout="vertical"
                className="row-col"
            >
                {(!!completedTodo && completedTodo?.status === STATUS.PENDING) && renderModalForPending()}
            </Form>
        </CustomModal>
    )
}
