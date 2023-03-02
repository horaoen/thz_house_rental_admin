import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./LoginPage.module.css";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { getCurrentUserAtom, getTokenAtom } from "../../recoil/atom";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const setToken = useSetRecoilState(getTokenAtom());
  const setCurrentUser = useSetRecoilState(getCurrentUserAtom());

  async function login(values: any) {
    try {
      const response = await axios.post("/auth/login/email", {
        email: values.email,
        password: values.password,
      });

      const token = response.data.data;
      setToken(token);

      axios.defaults.headers.common["Authorization"] = token;
      if (values.remember) {
        localStorage.setItem("token", token);
      }

      const currentUserResponse = await axios.get("/auth/currentUser");
      setCurrentUser(currentUserResponse.data);

      navigate("/house");
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.response?.data.message);
      }
    }
  }

  return (
    <div className={styles.container}>
      <Typography.Title level={2} className={styles.title}>
        亭好住
      </Typography.Title>
      <Form
        initialValues={{ remember: true }}
        onFinish={login}
        style={{ marginTop: "60px" }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "请输入邮箱" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="邮箱" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
