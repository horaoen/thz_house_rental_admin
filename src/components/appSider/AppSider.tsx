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
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleClick = ({ key }) => {
    switch (key) {
      case "1":
        navigate("/house");
        break;
      case "2":
        navigate("/user");
        break;
      case "3":
        navigate("/requirement");
        break;
      case "4":
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
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "房源",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "用户",
            },
            {
              key: "3",
              icon: <MessageOutlined />,
              label: "需求",
            },
            {
              key: "4",
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
