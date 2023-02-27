import styles from "./AppSider.module.css";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { useState } from "react";

export const AppSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed} width={150}>
        <Menu
          theme="dark"
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
