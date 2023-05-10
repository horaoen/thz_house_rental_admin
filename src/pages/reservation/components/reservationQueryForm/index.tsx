import { Button, Col, Form, Input, Row } from "antd";
import { Page } from "../../../../type";
import styles from "./index.module.css";
import { useEffect } from "react";

interface PropTypes {
  handleSearch: Function;
  page: Page;
  onPageChange: Function;
}
export const ReservationQueryForm: React.FC<PropTypes> = ({
  handleSearch,
  page,
  onPageChange
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.submit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  
  function handleReset() {
    form.resetFields();
    onPageChange({pageNo: 1, pageSize: 10})
  }

  return (
    <Form className={styles.container}
      form={form} 
      onFinish={(values: any) => {
        handleSearch(values);
      }
    }>
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
