import styles from "./AppSider.module.css";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AppSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [naviKey, setNaviKey] = useState("house");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const routePath = location.pathname;
    if (routePath.includes("house")) {
      setNaviKey("house");
    } else if (routePath.includes("user")) {
      setNaviKey("user");
    } else if (routePath.includes("requirement")) {
      setNaviKey("requirement");
    } else if (routePath.includes("reservation")) {
      setNaviKey("reservation");
    }
  }, [location]);

  const handleClick = ({ key }) => {
    switch (key) {
      case "house":
        navigate("/house");
        break;
      case "user":
        navigate("/user");
        break;
      case "requirement":
        navigate("/requirement");
        break;
      case "reservation":
        navigate("/reservation");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed} width={150}>
        <Menu
          theme="dark"
          onClick={handleClick}
          selectedKeys={[naviKey]}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "house",
              icon: <HomeOutlined />,
              label: "房源",
            },
            {
              key: "user",
              icon: <UserOutlined />,
              label: "用户",
            },
            {
              key: "requirement",
              icon: <MessageOutlined />,
              label: "需求",
            },
            {
              key: "reservation",
              icon: <ShoppingCartOutlined />,
              label: "预约",
            },
          ]}
        />

        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: styles.trigger,
            onClick: () => setCollapsed(!collapsed),
          }
        )}
      </Sider>
    </>
  );
};
