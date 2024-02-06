import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  List,
  Pagination,
  Radio,
  Row,
  Segmented,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { baseUrl } from "../../api/api";
import { isValidString, profileStatus } from "../../utils/Constants";
import moment from "moment";
import {
  AppstoreOutlined,
  BarsOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { debounce } from "../../utils/Helpers";
import ProfileStatusModal from "./Components/ProfileStatusModal";
import { useHistory } from "react-router-dom";

export default function Profiles(props) {
  const history = useHistory();
  const [profiles, setProfiles] = useState([]);
  const [total, setTotal] = useState(0);
  const [, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("APPROVED");
  const [isModal, setIsModal] = useState(false);
  const [selectStatus, setSelectStatus] = useState("APPROVED");

  async function profileCall(paging) {
    try {
      setIsLoading(true);
      let response = await baseUrl.post(
        `/profile?page=${paging}&limit=${limit}`,
        {
          status: status ?? "",
          filter: search ?? "",
        }
      );
      setIsLoading(false);

      if (response.status !== 200) {
        setError("Something went wrong");
      }
      const profiles = Array.isArray(response?.data?.data?.rows)
        ? response.data.data.rows
        : [];
      const profileCount = response.data.data.count ?? 0;
      setProfiles(profiles);
      setTotal(profileCount);
    } catch (error) {
      setError("Something went wrong");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    profileCall(page);
    // eslint-disable-next-line
  }, [page, search, status]);

  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      render: (text, row) => {
        return (
          <Avatar
            size="large"
            icon={<UserOutlined />}
            src={row?.profile_images[0]?.uri}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "DOB & Age",
      dataIndex: "age",
      width: "32%",
      key: "age",
      render: (text, row) => {
        return (
          <span>
            {isValidString(row?.dob)
              ? moment(row?.dob).format("DD-MM-YYYY")
              : null}{" "}
            & {text}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, _) => {
        return (
          <span>
            {isValidString(text) ? profileStatus(text.toLowerCase()) : ""}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_, row) => {
        return (
          <span>
            <Space>
              <Typography.Link
                onClick={() => {
                  history.push(`/profile/${row.id}`, {
                    data: { ...row },
                  });
                }}
              >
                View
              </Typography.Link>
              <Typography.Link
                onClick={() => {
                  setIsModal(true);
                }}
              >
                Status
              </Typography.Link>
            </Space>
          </span>
        );
      },
    },
  ];

  const handleCancel = useCallback(() => {
    setIsModal(false);
    // eslint-disable-next-line
  }, [isModal]);

  const handleOk = useCallback(() => {}, []);

  const renderProfileModal = () => {
    return (
      <ProfileStatusModal
        isModalOpen={isModal}
        handleCancel={handleCancel}
        handleOk={handleOk}
      >
        <p>Are you sure do you want to submit the changes?</p>
        <Select
          value={selectStatus}
          placeholder="Change status"
          size="medium"
          onChange={(value) => {
            setSelectStatus(value);
          }}
        >
          <Select.Option value="APPROVED">Approved</Select.Option>
          <Select.Option value="PAYMENT_DONE">Payment done</Select.Option>
          <Select.Option value="EXPIRED">Expired</Select.Option>
          <Select.Option value="MARRIAGE_FIXED">Marriage fixed</Select.Option>
        </Select>
      </ProfileStatusModal>
    );
  };

  const debouncedOnSearchHandler = useCallback(
    debounce((searchText) => {
      if (isValidString(searchText) && searchText.length > 0) {
        setSearch(searchText);
      }
    }, 800),
    [search]
  );

  return (
    <div className="tabled">
      {isValidString(error) ? error : null}
      <Row gutter={[24, 0]}>
        <Col xs={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Profiles"
            extra={
              <>
                <Radio.Group
                  className="radio-btn"
                  onChange={(e) => {
                    setPage(1);
                    setStatus(e.target.value);
                  }}
                  value={status}
                  defaultValue="APPROVED"
                >
                  <Radio.Button value="APPROVED">Approved</Radio.Button>
                  <Radio.Button value="EXPIRED">Expired</Radio.Button>
                  <Radio.Button value="MARRIAGE_FIXED">
                    Marriage fixed
                  </Radio.Button>
                  <Radio.Button value="PAYMENT_DONE">Payment done</Radio.Button>
                </Radio.Group>

                <Segmented
                  onChange={(e) => {
                    setPage(1);
                    setStatus(e);
                  }}
                  value={status}
                  defaultValue="APPROVED"
                  options={[
                    {
                      label: "Approved",
                      value: "APPROVED",
                    },
                    {
                      label: "Expired",
                      value: "EXPIRED",
                    },
                    {
                      label: "Marriage Fixed",
                      value: "MARRIAGE_FIXED",
                    },
                    {
                      label: "Payment Done",
                      value: "PAYMENT_DONE",
                    },
                  ]}
                  block
                />
              </>
            }
          >
            <div className="table-responsive">
              <span
                className="input-group"
                style={{
                  padding: 10,
                  display: "flex",
                  width: "32%",
                }}
              >
                <Input
                  placeholder="Search...."
                  name="search"
                  onChange={(e) => {
                    if (
                      isValidString(e.target.value) &&
                      e.target.value.length > 0
                    ) {
                      setPage(1);
                      debouncedOnSearchHandler(e.target.value);
                    } else {
                      setPage(1);
                      setSearch("");
                    }
                  }}
                />
              </span>
              <Table
                rowKey={`key_${Date.now()}`}
                columns={columns}
                dataSource={profiles}
                pagination={false}
                className="profile-table ant-border-space"
              />
              <List
                className="profile-list"
                align={"center"}
                size="small"
                dataSource={profiles}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      onClick={() => {
                        history.push(`/profile/${item.id}`, {
                          data: { ...item },
                        });
                      }}
                      avatar={<Avatar src={item.profile_images[0]?.uri} />}
                      title={item.name}
                      description={item.mobile}
                    />
                    <Tag
                      color="default"
                      onClick={() => {
                        history.push(`/profile/${item.id}`, {
                          data: { ...item },
                        });
                      }}
                    >
                      {item.status}
                    </Tag>
                    <Button
                      onClick={() => {
                        setIsModal(true);
                      }}
                      type="primary"
                      size="small"
                    >
                      Status
                    </Button>
                  </List.Item>
                )}
              />
              <span className="pagination-block">
                <Pagination
                  total={total}
                  showTotal={(total) => `Total ${total} items`}
                  current={page}
                  onChange={(current, pageSize) => {
                    setPage(current);
                  }}
                />
              </span>
            </div>
          </Card>
        </Col>
      </Row>
      {isModal ? renderProfileModal() : null}
    </div>
  );
}
