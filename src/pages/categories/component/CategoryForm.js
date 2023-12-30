import { Form, Input, Radio } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import CustomError from '../../../components/error/CustomError';
import CustomModal from '../../../components/modal/CustomModal';
import { addCategory, fetchCategories, updateCategory } from '../CategorySlice';
export default function CategoryForm(props) {
    const { formik, isCategoryModal, onCloseModal, edit } = props;
    const dispatch = useDispatch();
    const onOkHandler = async () => {
        if (edit) {
            await dispatch(updateCategory({ data: formik.values }))
                .then(async (res) => {
                    await dispatch(fetchCategories({ page: 1, limit: 10 }));
                    onCloseModal();
                })
        } else {
            dispatch(addCategory({ data: formik.values }))
                .then(async (res) => {
                    await dispatch(fetchCategories({ page: 1, limit: 10 }));
                    onCloseModal();
                })
        }
    };

    const onCancelHandler = () => {
        return onCloseModal()
    };

    return (
        <CustomModal
            open={isCategoryModal}
            title={edit ? "Edit Category" : "New Category"}
            onOk={onOkHandler}
            onCancel={onCancelHandler}
            okButtonDisabled={!(formik.isValid && formik.dirty)}
        >
            <Form
                layout="vertical"
                className="row-col"
            >
                <Form.Item
                    label="Category Name"
                    name="categoryName"
                >
                    <Input
                        type="text"
                        name="categoryName"
                        value={formik.values.categoryName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Category Name"
                    />
                    {formik.touched.categoryName && formik.errors.categoryName ? (
                        <CustomError error={formik.errors.categoryName} />
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
