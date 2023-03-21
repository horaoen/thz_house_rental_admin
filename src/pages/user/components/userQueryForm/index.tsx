import { Row, Col, Input, Button, Form } from "antd";
import { useEffect } from "react";
import { Page } from "../../../../type";
import styles from "./index.module.css";

interface PropTypes {
  handleSearch: Function;
  page: Page;
  onPageChange: Function;
}
export const UserQueryForm: React.FC<PropTypes> = ({
  handleSearch,
  page,
  onPageChange,
}) => {
  const [form] = Form.useForm();

  async function handleReset() {
    form.resetFields();
    onPageChange({ pageNo: 1, pageSize: 10 });
  }

  useEffect(() => {
    form.submit();
  }, [page, form]);

  return (
    <Form
      className={styles.container}
      form={form}
      onFinish={(values: any) => {
        handleSearch(values);
      }}
    >
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
