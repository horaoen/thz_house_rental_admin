import { Button, Col, Form, Input, Row } from "antd";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { getReservationListAtom } from "../../../../recoil/atom";
import { Page } from "../../../../type";
import styles from "./index.module.css";

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
  const setReservationDataSource = useSetRecoilState(getReservationListAtom());
  const [form] = Form.useForm();

  async function handleCommit(values: any) {
    const res = await axios.get("/reservation/superList", {
      params: values
    });
    setReservationDataSource(res.data.data.records);
  }

  async function handleReset() {
    form.resetFields();
    handleCommit(null)
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
