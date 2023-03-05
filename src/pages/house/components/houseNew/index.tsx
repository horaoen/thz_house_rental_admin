import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { Link } from "react-router-dom";

export const HouseNew: React.FC = () => {
  return (
    <div>
      <Form
        className={styles.form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Row justify="center">
          <Col span={10}>
            <Form.Item
              label="价格"
              name="price"
              rules={[{ required: true, message: "请输入价格" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="面积" name="area">
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={10}>
            <Form.Item label="类型" name="type">
              <Select>
                <Select.Option value="整租">整租</Select.Option>
                <Select.Option value="合租">合租</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="户型">
              <Select>
                <Select.Option value="一居室">一居室</Select.Option>
                <Select.Option value="两居室">两居室</Select.Option>
                <Select.Option value="三居室">三居室</Select.Option>
                <Select.Option value="四居室及以上">四居室及以上</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="位置"
              name="location"
              rules={[{ required: true, message: "请输入房源位置" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="详情描述"
              name="description"
              rules={[{ required: true, message: "请输入房源位置" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="图片" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="视频" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Row justify="center">
          <Col span={6}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Col>
          <Col span={6}>
            <Link to="/house">
              <Link to="/house/new">
                <Button type="default">返回</Button>
              </Link>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
