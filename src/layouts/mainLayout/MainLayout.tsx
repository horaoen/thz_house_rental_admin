import { Layout } from "antd";
import styles from "./MainLayout.module.css";
import { Content } from "antd/es/layout/layout";
import { AppFooter, AppHeader, AppSider } from "../../components";
import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <>
      <Layout className={styles.globalLaout}>
        <AppHeader />
        <Layout>
          <AppSider />
          <Layout>
            <Content>
              <Outlet />
            </Content>
            <AppFooter />
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};
