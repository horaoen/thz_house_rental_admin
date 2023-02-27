import { CopyrightOutlined } from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";
import styles from "./AppFooter.module.css"

export const AppFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <CopyrightOutlined /> 滁州开发区亭好住电子商务经营部
    </Footer>
  );
};
