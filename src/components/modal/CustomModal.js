import React from 'react';
import { Modal } from 'antd';

export default function CustomModal(props) {
    const { open, title, onOk, onCancel, children, okButtonDisabled,buttonLoading,buttonText } = props;
    return (
        <Modal
            confirmLoading={buttonLoading}
            title={title}
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okButtonProps={{ disabled: okButtonDisabled }}
            maskClosable={false}
            okText={buttonText}
        >
            {children}
        </Modal>
    )
};

CustomModal.defaultProps = {
    buttonLoading: false,
    buttonText: 'OK'
}
