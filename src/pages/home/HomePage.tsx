import "antd/dist/reset.css";
import React from "react";
import styles from "./HomePage.module.css";
import { Layout } from "antd";
import { AppHeader } from "../../components";

const { Footer, Sider, Content } = Layout;

export const HomePage: React.FC = () => {
  return (
    <Layout className={styles.globalLaout}>
      <AppHeader />
      <Layout>
        <Sider>sider</Sider>
        <Layout>
          <Content>content</Content>
          <Footer>footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
