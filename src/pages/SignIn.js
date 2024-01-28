/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component } from "react";
import { AES } from "crypto-js";

import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import AlertModal from "./Alert";

let cipher = {
  email: "admin@guruvarul.com",
  password: "Guruvarul@123",
};
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Content } = Layout;
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      secret: "guruvarul",
      visible: false,
    };
  }

  onChangeHandler = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  handleClose = () => {
    this.setState((prevState) => ({
      ...prevState,
      visible: false,
    }));
  };

  onClickHandler = (e) => {
    let { email, password, secret } = this.state;
    if (email === cipher.email && password === password) {
      this.setState({
        ...this.state,
        visible: true,
        type: "success",
        message: "login success",
      });
      localStorage.setItem(
        "users",
        JSON.stringify({
          id: Date.now(),
          email,
          password,
        })
      );
      this.props.history.push("/profiles");
    } else {
      // incorrect credentials
      this.setState({
        ...this.state,
        visible: true,
        type: "error",
        message: "login failed",
      });
    }
  };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevState?.type === "success" || prevState?.type === "error") {
      setTimeout(() => {
        this.setState((prev) => ({
          ...prev,
          visible: false,
          message: "",
          type: "",
        }));
      }, 2000);
    }
  }
  render() {
    return (
      <>
        <AlertModal
          visible={this.state.visible}
          handleClose={this.handleClose}
          message={this.state.message}
          type={this.state.type}
        />
        <Layout className="layout-default layout-signin">
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Sign In</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter your email and password to sign in
                </Title>
                <Form layout="vertical" className="row-col">
                  <Form.Item
                    className="username"
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      name="email"
                      placeholder="Email"
                      onChange={this.onChangeHandler}
                    />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      name="password"
                      placeholder="Password"
                      onChange={this.onChangeHandler}
                    />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    className="aligin-center"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked onChange={onChange} />
                    Remember me
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      onClick={this.onClickHandler}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    );
  }
}
