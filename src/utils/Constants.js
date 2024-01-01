export const profileStatus = (status) => {
    let res = '';
    switch (status) {
        case 'waiting_for_approval':
            res = 'Waiting for approval';
            break;
        case 'payment_done':
            res = 'Payment done';
            break;
        case 'expired':
            res = 'Expired';
            break;
        case 'approved':
            res = 'Approved';
            break;
        case 'marriage_fixed':
            res = 'Marriage done';
            break;
        default:
            res = '-';
    };
    return res
};

export const isValidElement = (data) => {
    return data !== null && data !== undefined;
};
export const isValidNumber = (data) => {
    return isValidString(data) && !isNaN(data);
};

export function isValidArray(data) {
    return Array.isArray(data) && data.length !== 0
}

export const isValidString = (data) => {
    return data !== null && data !== undefined && data !== "";
};

export const isEmptyArray = (data) => {
    return Array.isArray(data) && data.length === 0;
};

export const isNonEmptyString = (data) => {
    return data !== null && data !== undefined && data.toString().length > 0;
};