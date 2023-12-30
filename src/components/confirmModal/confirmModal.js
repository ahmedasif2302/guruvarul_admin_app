import React from 'react'
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons'
export const deleteConfirmationModal = ({ title, content, onOkHandler, onCancelHandler }) => {
    return (
        Modal.confirm({
            title: title,
            icon: <ExclamationCircleOutlined />,
            content: content,
            okText: 'Delete',
            cancelText: 'Cancel',
            onOk: onOkHandler,
            onCancel: onCancelHandler
        })
    )
}
export const submitConfirmationModal = ({ title, content, onOkHandler, onCancelHandler }) => {
    return (
        Modal.confirm({
            title: title,
            icon: <CheckOutlined />,
            content: content,
            okText: 'Submit',
            cancelText: 'Cancel',
            onOk: onOkHandler,
            onCancel: onCancelHandler
        })
    )
}
