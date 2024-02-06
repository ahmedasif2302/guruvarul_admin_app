import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  List,
  Modal,
  Row,
  Space,
  notification,
} from "antd";
import React, { useState } from "react";
import { isValidElement } from "../../../utils/Constants";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../../api/api";

export default function ProfileDetail({}) {
  let location = useLocation();
  let { state } = location;
  const [modalOpen, setModalOpen] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);
  let data = isValidElement(state.data) ? state.data : null;
  if (!isValidElement(data)) {
    return <p>No data found</p>;
  }

  const renderImages = (images) => {
    return images.map((image) => {
      return (
        <Col xs={"auto"}>
          <Image style={{ maxHeight: 200 }} src={image?.uri} />
        </Col>
      );
    });
  };

  const onSuccess = () => {
    notification.success({
      message: `Success`,
      description: "Profile status updated",
      placement: "topRight",
    });
  };

  const onError = (message) => {
    notification.error({
      message: `Something went wrong`,
      description: message.toString(),
      placement: "topRight",
    });
  };

  const onUpateStatusApiHandler = async () => {
    try {
      let response = await baseUrl.put(
        `approved/subscriptions/${data?.userId}/${subscriptionId}`,
        {}
      );
      if (response.status === 200) {
        setModalOpen(false);
        setSubscriptionId(null);
        onSuccess();
      } else {
      }
    } catch (error) {
      console.log(error);
      onError(error?.message);
      setSubscriptionId(null);
      setModalOpen(false);
    }
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
            renderItem={(item) => {
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Image
                        width={100}
                        height={100}
                        src={item?.paymentScreenshot}
                      />
                    }
                    title={item.name}
                    description={moment(item.paymentDate).format("DD-MM-YYYY")}
                  />
                  <div className="amount">
                    {item.status ? (
                      <span className={item.amountcolor}>APPROVED</span>
                    ) : (
                      <div className="col-action">
                        <Button
                          type="link"
                          onClick={() => {
                            setSubscriptionId(item?.id);
                            setModalOpen(true);
                          }}
                        >
                          Change Status
                        </Button>
                      </div>
                    )}
                  </div>
                </List.Item>
              );
            }}
          />
        </Card>
      </Col>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        title="Status"
        open={modalOpen}
        onOk={onUpateStatusApiHandler}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        <p>Are you sure do you want to change the status?</p>
      </Modal>
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
          <Row gutter={[16, 16]}>{renderImages(data?.profile_images)}</Row>
          <Row gutter={[24, 24]}>
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
      {modalOpen ? renderModal() : null}
    </Row>
  );
}
