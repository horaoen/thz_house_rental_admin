import { Layout } from "antd";
import styles from "./MainLayout.module.css";
import { Content } from "antd/es/layout/layout";
import { AppFooter, AppHeader, AppSider } from "../../components";

interface PropsType {
  children: React.ReactNode;
}
export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <>
      <Layout className={styles.globalLaout}>
        <AppHeader />
        <Layout>
          <AppSider />
          <Layout>
            <Content>{children}</Content>
            <AppFooter />
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};
