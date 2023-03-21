import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PriceRangeSelector } from "../../../../components";
import { Page } from "../../../../type";

interface PropTypes {
  handleSearch: Function;
  page: Page;
  onPageChange: Function;
}
export const HouseQueryForm: React.FC<PropTypes> = ({
  handleSearch,
  page,
  onPageChange,
}) => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const [priceRange, setPriceRange] = useState({
    minPrice: 100,
    maxPrice: 2000,
  });

  async function handleCommit(values: any) {
    const params = expand
      ? {
        ...values,
        minPrice: priceRange.minPrice,
        maxPrice: priceRange.maxPrice,
        ...page,
      }
      : {
        ...values,
        ...page,
      };
    handleSearch(params);
  }

  useEffect(() => {
    form.submit();
  }, [page, form]);

  async function reset() {
    setPriceRange({ minPrice: 100, maxPrice: 2000 });
    form.resetFields();
    onPageChange({ pageNo: 1, pageSize: 10 });
  }

  return (
    <Form
      className={styles.container}
      form={form}
      initialValues={{
        type: "",
        houseType: "",
        leaseTerm: "",
      }}
      onFinish={handleCommit}
    >
      <Row align="middle" justify="space-around">
        <Col span={3}>
          <Form.Item label="租期" name="leaseTerm">
            <Select
              options={[
                { value: "", label: "不限" },
                { value: "短租", label: "短租" },
                { value: "长租", label: "长租" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="类型" name="type">
            <Select
              options={[
                { value: "", label: "不限" },
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
              options={[
                { value: "", label: "不限" },
                { value: "一居室", label: "一居室" },
                { value: "两居室", label: "两居室" },
                { value: "三居室", label: "三居室" },
                { value: "四居室及以上", label: "四居室及以上" },
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

      {expand && (
        <Row justify="start">
          <Col span={6}>
            <Form.Item label="价格">
              <PriceRangeSelector
                values={priceRange}
                onChange={setPriceRange}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row justify="end" align="middle">
        <Col style={{ marginRight: "10px" }}>
          <Link to="/house/new">
            <Button type="primary">新建</Button>
          </Link>
        </Col>
        <Col style={{ marginRight: "10px" }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Col>
        <Col style={{ marginRight: "5px" }}>
          <Button onClick={reset}>重置</Button>
        </Col>
        <Col span={1} style={{ marginRight: "15px" }}>
          <Button
            type="link"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} 展开
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
