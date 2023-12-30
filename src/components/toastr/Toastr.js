import { notification } from 'antd';
import { isValidString } from '../../Utils/helpers';

export const successToastr = (title, desc, duration, placement?) => {
    const args = {
        message: title,
        description: desc,
        duration,
        placement: isValidString(placement) ? placement : 'topRight'
    };
    notification.success(args);
};

export const errorToastr = (title, desc, duration) => {
    const args = {
        message: title,
        description: desc,
        duration
    };
    notification.error(args);
};

export const infoToastr = (title, desc, duration) => {
    const args = {
        message: title,
        description: desc,
        duration
    };
    notification.info(args);
};

export const warningToastr = (title, desc, duration) => {
    const args = {
        message: title,
        description: desc,
        duration
    };
    notification.warning(args);
};