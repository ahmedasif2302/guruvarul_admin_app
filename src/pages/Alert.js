import React, { useState } from "react";
import { Alert, Switch, Space } from "antd";
const AlertModal = ({ visible, handleClose, message, type }) => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      {visible && (
        <Alert
          message={message}
          type={type}
          closable
          afterClose={handleClose}
        />
      )}
    </Space>
  );
};
export default AlertModal;
