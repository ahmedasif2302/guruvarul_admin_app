import { DatePicker, Form, Input, Radio, Select } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomError from '../../../components/error/CustomError';
import CustomModal from '../../../components/modal/CustomModal';
import { isValidArray } from '../../../Utils/helpers';
import { addAgreement, fetchAgreements, updateAgreement } from '../AgreementSlice';

const { Option } = Select;
export default function AgreementForm(props) {
    const { formik, isAgreementModal, isCloseAgreementModal, onCloseModal, edit } = props;
    const dispatch = useDispatch();

    const activeProperties = useSelector(state => state.property.activeProperties);
    const user = useSelector(state => state.login.user);


    const onOkHandler = async () => {
        let data = formik.values || {};
        if (edit) {
            if (isCloseAgreementModal || !!formik.values?.endDate) {
                data['isActive'] = false;
            }
            await dispatch(updateAgreement({ data }))
                .then(async (res) => {
                    await dispatch(fetchAgreements({ page: 1, limit: 10 }));
                    onCloseModal();
                })
        } else {
            data['isActive'] = true;
            dispatch(addAgreement({ data }))
                .then(async (res) => {
                    await dispatch(fetchAgreements({ page: 1, limit: 10 }));
                    onCloseModal();
                })
        }
    };

    const onCancelHandler = () => {
        return onCloseModal()
    };

    const onDateHanlder = (date, dateString, field) => {
        formik.setFieldValue(field, date)
    };

    const onSelectHandler = useCallback((field, value) => {
        formik.setFieldValue(field, value)
    }, []);

    const renderNewAgreementForm = () => {
        return (
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
                                <Option key={property.id} value={property.id}>{property.propertyName}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Staff Name"
                    name="staffName"
                >
                    <Input
                        type="text"
                        name="staffName"
                        value={formik.values.staffName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Staff Name"
                    />
                    {formik.touched.staffName && formik.errors.staffName ? (
                        <CustomError error={formik.errors.staffName} />
                    ) : null}
                </Form.Item>
                <Form.Item
                    label="Unit"
                    name="unit"
                >
                    <Input
                        type="text"
                        name="unit"
                        value={formik.values.unit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Staff Name"
                    />
                    {formik.touched.unit && formik.errors.unit ? (
                        <CustomError error={formik.errors.unit} />
                    ) : null}
                </Form.Item>
                <Form.Item
                    label="Start Date"
                >
                    <DatePicker
                        name='fromDate'
                        placeholder="Start date"
                        format="DD-MM-YYYY"
                        allowClear={false}
                        value={formik.values.fromDate}
                        onChange={(date, dateString) => onDateHanlder(date, dateString, "fromDate")}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                {!formik.values?.isActive && renderCloseAgreementForm()}
            </Form>
        )
    };

    const renderCloseAgreementForm = () => {
        return (
            <Form
                layout="vertical"
                className="row-col"
            >
                <Form.Item
                    label="End Date"
                >
                    <DatePicker
                        name='endDate'
                        placeholder="End date"
                        format="DD-MM-YYYY"
                        allowClear={false}
                        value={formik.values.endDate}
                        onChange={(date, dateString) => onDateHanlder(date, dateString, "endDate")}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </Form>
        )
    }

    return (
        <CustomModal
            open={isAgreementModal || isCloseAgreementModal}
            title={edit ? "Edit Agreement" : "New Agreement"}
            onOk={onOkHandler}
            onCancel={onCancelHandler}
            okButtonDisabled={!(formik.isValid && formik.dirty)}
        >
            {isAgreementModal && renderNewAgreementForm()}
            {isCloseAgreementModal && renderCloseAgreementForm()}
        </CustomModal>
    )
}
