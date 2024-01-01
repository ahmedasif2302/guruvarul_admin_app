import { Button, Card, Col, Descriptions, Image, Row, Space } from 'antd';
import React from 'react'
import { isValidElement } from '../../../utils/Constants';
import moment from 'moment';

export default function ProfileDetail({ location }) {
    let { state } = location;
    let data = isValidElement(state.data) ? state.data : null;
    if (!isValidElement(data)) {
        return (
            <p>No data found</p>
        )
    };

    const renderImages = (images) => {
        return (

            images.map(image => {
                return (
                    <Space direction='horizontal'>
                            <Image
                                width={200}
                                height={250}
                                src={image?.uri}
                            />
                    </Space>
                )
            })

        )
    };

    return (
        <Row gutter={[24, 0]}>
            <Col span={24} md={16} className="mb-24">
                <Card
                    className="header-solid h-full"
                    bordered={false}
                    title={[<h6 className="font-semibold m-0">Profile Information</h6>]}
                    bodyStyle={{ paddingTop: "0" }}
                >
                    <Row gutter={[24, 24]}>
                        {renderImages(data?.profile_images)}
                        <Col span={24}>
                            <Card className="card-billing-info" bordered="false">
                                <div className="col-info">
                                    <Descriptions title={`${data?.name} - ${data?.gender}`}>
                                        <Descriptions.Item label="Father's name" span={3}>
                                            {data?.fatherName}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Mother's name" span={3}>
                                            {data?.motherName}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Mobile" span={3}>
                                            {data?.mobile}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Email Address" span={3}>
                                            {data?.email}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Address" span={3}>
                                            {data?.address}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Birth Place" span={3}>
                                            {data?.birthPlace}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Qualification" span={3}>
                                            {data?.qualification}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Company Name" span={3}>
                                            {data?.companyName}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="DOB & Age" span={3}>
                                            {moment(data?.dob).format('DD-MM-YYYY')} & {data?.age}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </div>
                                <div className="col-action">
                                    <Button type="link">
                                        Change Status
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Col>
            {/* <Col span={24} md={8} className="mb-24">
                <Card
                    bordered={false}
                    bodyStyle={{ paddingTop: 0 }}
                    className="header-solid h-full  ant-list-yes"
                    title={<h6 className="font-semibold m-0">Your Transactions</h6>}
                    extra={
                        <p className="card-header-date">
                            <span>23 - 30 March 2021</span>
                        </p>
                    }
                >
                    <List
                        header={<h6>NEWEST</h6>}
                        className="transactions-list ant-newest"
                        itemLayout="horizontal"
                        dataSource={[]}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar size="small" className={item.textclass}>
                                        </Avatar>
                                    }
                                    title={item.title}
                                    description={item.description}
                                />
                                <div className="amount">
                                    <span className={item.amountcolor}>{item.amount}</span>
                                </div>
                            </List.Item>
                        )}
                    />

                    <List
                        className="yestday transactions-list"
                        header={<h6>YESTERDAY</h6>}
                        itemLayout="horizontal"
                        dataSource={[]}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar size="small" className={item.textclass}>
                                            {item.avatar}
                                        </Avatar>
                                    }
                                    title={item.title}
                                    description={item.description}
                                />
                                <div className="amount">
                                    <span className={item.amountcolor}>{item.amount}</span>
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
            </Col> */}
        </Row>
    )
}
