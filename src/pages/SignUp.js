
import React, { Component } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Row,
  Col,
  Form,
  Input,
  Switch,
  Menu
} from "antd";
import logo3 from "../assets/images/Google__G__Logo.svg.png";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default class SignUp extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <Layout className="layout-default layout-signin">
          <Header>
            <div className="header-col header-brand">
              <h5>Mahroof Todo Dashboard</h5>
            </div>
          </Header>
          <Content className="signin" style={{ height: "80vh", justifyContent: 'center', alignItems: 'center' }}>
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Sign In</Title>
                <Title className="font-regular text-muted" level={5}>
                  Please use your authorised Gmail account to login
                </Title>
                <Button type="false" style={{ width: 300, height: 75 }}>
                  <img height={50} width={50} src={logo3} alt="logo 3" />
                </Button>
              </Col>
            </Row>
          </Content>
          <Footer>
            <p className="copyright">
              {" "}
              Copyright © 2021 Mahroof Todo Dashboard by <a href="#pablo">Ahm Logics Pvt Ltd</a>.{" "}
            </p>
          </Footer>
        </Layout>
      </>
    );
  }
}
