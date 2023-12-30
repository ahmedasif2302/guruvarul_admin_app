

// import { useState } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { dashboard, tables } from "./SidenavIcons";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand">
        {/* <img src={logo} alt="" /> */}
        <span>Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
      <Menu.Item key="2">
          <NavLink to="/profiles">
            <span
              className="icon"
              style={{
                background: page === "profiles" ? color : "",
              }}
            >
              {tables(color)}
            </span>
            <span className="label">Profiles</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/property">
            <span
              className="icon"
              style={{
                background: page === "property" ? color : "",
              }}
            >
              {tables(color)}
            </span>
            <span className="label">Property</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/category">
            <span
              className="icon"
              style={{
                background: page === "category" ? color : "",
              }}
            >
              {tables(color)}
            </span>
            <span className="label">Category</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/todos">
            <span
              className="icon"
              style={{
                background: page === "todos" ? color : "",
              }}
            >
              {tables(color)}
            </span>
            <span className="label">Todos</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/agreements">
            <span
              className="icon"
              style={{
                background: page === "agreements" ? color : "",
              }}
            >
              {tables(color)}
            </span>
            <span className="label">Agreement</span>
          </NavLink>
        </Menu.Item>
      </Menu>
      {/* <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <span className="icon" style={{ color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div> */}
    </>
  );
}

export default Sidenav;
