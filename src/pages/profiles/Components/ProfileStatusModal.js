import { Modal } from 'antd'
import React from 'react'

export default function ProfileStatusModal({ isModalOpen, handleOk, handleCancel, children }) {
    return (
        <Modal title="Profile Status" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            {children}
        </Modal>
    )
}
