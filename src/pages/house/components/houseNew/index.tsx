import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
  UploadProps,
} from "antd";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getTokenAtom } from "../../../../recoil/atom";
import { useState } from "react";
import axios from "axios";

export const HouseNew: React.FC = () => {
  const token = useRecoilValue(getTokenAtom());
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  async function handleSubmit(values: any) {
    console.log(values);
    const formData = { ...values, imageUrls };

    console.log(formData)
    await axios.post("/house/add", formData);
  }

  const props: UploadProps = {
    name: "uploadFile",
    action: "https://123.60.59.138:5000/file/upload",
    headers: {
      Authorization: token,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        setImageUrls(info.fileList.map((e) => e.response.data.url));
      }
      console.log(imageUrls);
    },
  };

  return (
    <div>
      <Form
        className={styles.form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={(values) => handleSubmit(values)}
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
            <Form.Item label="户型" name="houseType">
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

        <Form.Item label="图片" name="imageUrls">
          <Upload listType="picture-card" {...props}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Row justify="center">
          <Col span={6}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={(values: any) => handleSubmit(values)}
            >
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
