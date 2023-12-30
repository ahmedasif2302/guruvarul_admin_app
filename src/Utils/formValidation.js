import * as Yup from 'yup';

export const categoryValidation = {
    categoryName: Yup.string().trim().required('Category Name is required'),
    isActive: Yup.boolean().required("Status is required")
};

export const propertyValidation = {
    propertyName: Yup.string().trim().required('Property Name is required'),
    isActive: Yup.boolean().required("Status is required")
};

export const taskValidation = {
    propertyId: Yup.string().trim().required('Property Name is required'),
    categoryId: Yup.string().trim().required('Category Name is required'),
    title: Yup.string().trim().required('Title is required'),
    description: Yup.string().trim().required('Description is required'),
    priority: Yup.string().trim().required('Priority is required'),
    targetDate: Yup.string().required("Target Date is required")
};

const digitsOnly = (value) => /^\d+$/.test(value)
export const exportFormValidation = {
    page: Yup.string().trim().test('Digits only', 'The field should have digits only', digitsOnly).required('Page is required'),
    limit: Yup.string().trim().test('Digits only', 'The field should have digits only', digitsOnly).required('Limit is required'),
};

export const agreementValidation = {
    propertyId: Yup.string().trim().required('Property Name is required'),
    staffName: Yup.string().trim().required('Staff Name is required'),
    unit: Yup.string().trim().required('Unit is required'),
    fromDate: Yup.string().required("From Date is required")
};

export const closeAgreementValidation = {
    endDate: Yup.string().required("End Date is required")
}