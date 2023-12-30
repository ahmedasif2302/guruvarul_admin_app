import { Button, Form, Input, Radio, Switch } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import CustomError from '../../../components/error/CustomError';
import CustomModal from '../../../components/modal/CustomModal';
import { addProperty, fetchProperties, updateProperty } from '../propertySlice';

export default function PropertyForm(props) {
    const { formik, isPropertyModal, onCloseModal, edit } = props;
    const dispatch = useDispatch();
    const onOkHandler = () => {
        if (edit) {
            dispatch(updateProperty({ data: formik.values }))
                .then(async (res) => {
                    await dispatch(fetchProperties({ page: 1, limit: 10 }));
                    onCloseModal();
                })
        } else {
            dispatch(addProperty({ data: formik.values }))
                .then(async (res) => {
                    await dispatch(fetchProperties({ page: 1, limit: 10 }));
                    onCloseModal();
                })
        }
    };

    const onCancelHandler = () => {
        return onCloseModal()
    }

    return (
        <CustomModal
            open={isPropertyModal}
            title={edit ? "Edit Property" : "New Property"}
            onOk={onOkHandler}
            onCancel={onCancelHandler}
        >
            <Form
                layout="vertical"
                className="row-col"
            >
                <Form.Item
                    label="Property Name"
                    name="propertyName"
                >
                    <Input
                        type="text"
                        name="propertyName"
                        value={formik.values.propertyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Property Name" />
                    {formik.touched.propertyName && formik.errors.propertyName ? (
                        <CustomError error={formik.errors.propertyName} />
                    ) : null}
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="isActive"
                >
                    <Radio.Group value={formik.values.isActive} onChange={(e) => {
                        formik.setFieldValue('isActive', e.target.value)
                    }} defaultValue={formik.values.isActive}>
                        <Radio.Button value={true}>Active</Radio.Button>
                        <Radio.Button value={false}>Disable</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </CustomModal>
    )
}
