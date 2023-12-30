import React from 'react';
import { Table } from 'antd';
const CustomTable = (props) => {
    const { rows, columns, pagination, ...rest } = props;
    return (
        <Table
            dataSource={rows}
            columns={columns}
            pagination={pagination}
            className="ant-border-space"
            {...rest}
        />
    )
};

export default CustomTable;
