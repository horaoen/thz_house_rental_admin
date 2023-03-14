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
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getTokenAtom } from "../../../../recoil/atom";
import { CommonConstant } from "../../../../constant/constants";

export const HouseNew: React.FC = () => {
  const token = useRecoilValue(getTokenAtom());
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [mp4Urls, setMp4Urls] = useState<string[]>([]);
  const navigate = useNavigate();

  async function handleSubmit(values: any) {
    const formData = { ...values, imageUrls, mp4Urls };

    await axios.post("/house/add", formData);
    navigate("/house");
  }

  const basicProps: UploadProps = {
    name: "uploadFile",
    action: CommonConstant.baseUrl,
    headers: {
      Authorization: token,
    },
  };
  const imageProps: UploadProps = {
    ...basicProps,
    onChange(info) {
      if (info.file.status === "done") {
        setImageUrls(info.fileList.map((e) => e.response.data.url));
      }
    },
  };
  const mp4Pros: UploadProps = {
    ...basicProps,
    onChange(info) {
      if (info.file.status === "done") {
        setMp4Urls(info.fileList.map((e) => e.response.data.url));
      }
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
        initialValues={{
          leaseTerm: "",
          type: "",
        }}
      >
        <Row justify="center">
          <Col span={7}>
            <Form.Item
              label="价格"
              name="price"
              rules={[{ required: true, message: "请输入价格" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="面积" name="area">
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="押金" name="deposit">
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={7}>
            <Form.Item label="类型" name="type">
              <Select>
                <Select.Option value="">不限</Select.Option>
                <Select.Option value="整租">整租</Select.Option>
                <Select.Option value="合租">合租</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="户型" name="houseType">
              <Select>
                <Select.Option value="一居室">一居室</Select.Option>
                <Select.Option value="两居室">两居室</Select.Option>
                <Select.Option value="三居室">三居室</Select.Option>
                <Select.Option value="四居室及以上">四居室及以上</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="租期" name="leaseTerm">
              <Select>
                <Select.Option value="">不限</Select.Option>
                <Select.Option value="长租">长租</Select.Option>
                <Select.Option value="短租">短租</Select.Option>
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
          <Upload listType="picture-card" {...imageProps}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="视频" name="mp4Urls">
          <Upload listType="picture-card" {...mp4Pros}>
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
            <Button type="default" onClick={() => navigate(-1)}>
              返回
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
