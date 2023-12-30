
import React from "react";
import {
  Layout,
  Button,
  Typography,
  Row,
  Col,
  Space,
} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import logo3 from "../../assets/images/Google__G__Logo.svg.png";
import { loginWithGoogle, resetLoginState } from "./LoginSlice";
import { useHistory } from "react-router-dom";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  const { loading } = useSelector((state) => ({
    loading: state.login.loading
  }))
  const renderHeader = () => {
    return (
      <Header>
        <div className="header-col header-brand">
          <h5>Mahroof Todo Dashboard</h5>
        </div>
      </Header>
    )
  };

  const onLoginHandler = async () => {
    dispatch(loginWithGoogle())
      .then(res => {
        if (!!res?.payload?.token) {
          history.push("/todos")
        }
      })
  };

  const resetState = (e) => {
    e.preventDefault();
    dispatch(resetLoginState())
  }

  const renderLoadingContent = () => {
    return (
      <Space>
        <span>Loading ...</span>
        <a href="#!" onClick={resetState}>Click here to reload</a>
      </Space>
    )
  }

  const renderContent = () => {
    return (
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
            {!loading ? <Button type="false" style={{ width: 300, height: 75 }} onClick={() => onLoginHandler()}>
              <img height={50} width={50} src={logo3} alt="logo 3" />
            </Button> : renderLoadingContent()}
          </Col>
        </Row>
      </Content>
    )
  };
  const renderFooter = () => {
    return (
      <Footer>
        <p className="copyright">
          {" "}
          Copyright © 2021 Mahroof Todo Dashboard by <a href="#pablo">Ahm Logics Pvt Ltd</a>.{" "}
        </p>
      </Footer>
    )
  };

  return (
    <>
      <Layout className="layout-default layout-signin">
        {renderHeader()}
        {renderContent()}
        {renderFooter()}
      </Layout>
    </>
  );

};

export default Login;
