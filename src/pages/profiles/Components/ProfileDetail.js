import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  List,
  Row,
  Space,
} from "antd";
import React from "react";
import { isValidElement } from "../../../utils/Constants";
import moment from "moment";
import { useLocation } from "react-router-dom";

export default function ProfileDetail({ }) {
  let location = useLocation()
  let { state } = location;
  let data = isValidElement(state.data) ? state.data : null;
  if (!isValidElement(data)) {
    return <p>No data found</p>;
  }

  const renderImages = (images) => {
    return images.map((image) => {
      return (
        <Space direction="horizontal">
          <Image width={200} height={250} src={image?.uri} />
        </Space>
      );
    });
  };

  const renderSubscriptions = () => {
    return (
      <Col span={24} md={8} className="mb-24">
        <Card
          bordered={false}
          bodyStyle={{ paddingTop: 0 }}
          className="header-solid h-full  ant-list-yes"
          title={<h6 className="font-semibold m-0">Your Subscriptions</h6>}
          extra={
            <p className="card-header-date">
              <span></span>
            </p>
          }
        >
          <List
            header={<h6>NEWEST</h6>}
            className="transactions-list ant-newest"
            itemLayout="horizontal"
            dataSource={data?.subscriptions}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Image width={100} height={100} src={item?.paymentScreenshot} />
                  }
                  title={item.name}
                  description={moment(item.paymentDate).format('DD-MM-YYYY')}
                />
                <div className="amount">
                  <span className={item.amountcolor}>{item.status ? "Approved" : "Pending"}</span>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    );
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
                      {moment(data?.dob).format("DD-MM-YYYY")} & {data?.age}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div className="col-action">
                  <Button type="link">Change Status</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
      {renderSubscriptions()}
    </Row>
  );
}
