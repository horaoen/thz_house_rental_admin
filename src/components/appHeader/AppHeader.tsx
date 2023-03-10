import { Button, Col, Row, Typography } from "antd";
import logo from "../../assets/logo.svg";
import styles from "./AppHeader.module.css";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getTokenAtom } from "../../recoil/atom";

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(getTokenAtom());

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <Header className={styles.appHeader}>
      <Row align="middle">
        <Col span={6}>
          <span onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className={styles.logo} />
            <Typography.Title level={3} className={styles.title}>
              亭好住
            </Typography.Title>
          </span>
        </Col>
        <Col offset={16} span={2}>
          <Button type="primary" onClick={logout}>
            登出
          </Button>
        </Col>
      </Row>
    </Header>
  );
};
