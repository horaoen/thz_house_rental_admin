import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import styles from "./index.module.css";
import Link from "antd/es/typography/Link";
import { useState } from "react";

export const HouseQueryForm: React.FC = () => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  return (
    <Form className={styles.container} form={form}>
      <Row
        align="middle"
        justify="space-around"
      >
        <Col>
          <Form.Item label="租期" name="leaseTerm">
            <Select
              defaultValue="whatever"
              options={[
                { value: "whatever", label: "不限" },
                { value: "shortAndLong", label: "长&短租" },
                { value: "short", label: "短租" },
                { value: "long", label: "长租" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="类型" name="type">
            <Select
              defaultValue="whatever"
              options={[
                { value: "whatever", label: "不限" },
                { value: "entire", label: "整租" },
                { value: "shared", label: "合租" },
              ]}
            />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item label="户型" name="houseType">
            <Select
              style={{
                width: "130px",
              }}
              defaultValue="whatever"
              options={[
                { value: "whatever", label: "不限" },
                { value: "1", label: "1居室" },
                { value: "2", label: "2居室" },
                { value: "3", label: "3居室" },
                { value: "4", label: "4居室及以上" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="位置" name="location">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {expand && <Row>hello</Row>}
      <Row justify="end" align="middle">
        <Col style={{ marginRight: "10px" }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Col>
        <Col style={{ marginRight: "5px" }}>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Col>
        <Col span={1} style={{marginRight: "15px"}}>
          <Link
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} 展开
          </Link>
        </Col>
      </Row>
    </Form>
  );
};
