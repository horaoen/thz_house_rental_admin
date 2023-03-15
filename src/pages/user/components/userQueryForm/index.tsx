import { Row, Col, Input, Button, Form } from "antd";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { getUserListAtom } from "../../../../recoil/atom";
import styles from "./index.module.css";

export const UserQueryForm: React.FC = () => {
  const [form] = Form.useForm();
  const setUserDataSource = useSetRecoilState(getUserListAtom());

  async function handleCommit(values: any) {
    const res = await axios.get("/user/list", {
      params: values,
    });
    setUserDataSource(res.data.data.records);
  }

  async function handleReset() {
    form.resetFields();
    handleCommit(null);
  }

  return (
    <Form className={styles.container} form={form} onFinish={handleCommit}>
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
          <Button onClick={handleReset}>重置</Button>
        </Col>
      </Row>
    </Form>
  );
};
