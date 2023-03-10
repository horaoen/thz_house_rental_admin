import { Button, Col, Form, Input, Row } from "antd";
import styles from "./index.module.css";

export const RequireQueryForm: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form className={styles.container} form={form}>
      <Row align="top">
        <Col span={4} offset={2}>
          <Form.Item label="昵称" name="nickName">
            <Input />
          </Form.Item>
        </Col>
        <Col span={5} offset={2}>
          <Form.Item label="手机号" name="phone">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6} offset={5}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "20px" }}
          >
            查询
          </Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Col>
      </Row>
    </Form>
  );
};
