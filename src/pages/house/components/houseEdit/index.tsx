import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Upload,
  UploadProps,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getTokenAtom } from "../../../../recoil/atom";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { CommonConstant } from "../../../../constant/constants";

export const HouseEdit: React.FC = () => {
  const token = useRecoilValue(getTokenAtom());

  const navigate = useNavigate();
  const [images, setImages] = useState<any>();
  const [mp4s, setMp4s] = useState<any>();

  const { houseId } = useParams();
  const [data, setData] = useState<any>();
  const [form] = Form.useForm();

  async function handleSubmit(values: any) {
    const imageUrls = images.map((e: any) => {
      if (e?.url) {
        return e.url;
      } else {
        return e.response.data.url;
      }
    });
    const mp4Urls = mp4s.map((e: any) => {
      if (e?.url) {
        return e.url;
      } else {
        return e.response.data.url;
      }
    });
    const id = houseId;
    const formData = { ...values, id, imageUrls, mp4Urls };

    await axios.put("/house/update", formData);
    navigate("/house");
  }

  async function fetchData() {
    try {
      const res = await axios.get(`/house/get/${houseId}`);

      const imageInits = res.data.data.imageUrls?.map((url: any) => {
        return { url };
      });
      const mp4Inits = res.data.data.mp4Urls?.map((url: any) => {
        return { url };
      });

      setImages(imageInits);
      setMp4s(mp4Inits);

      setData(res.data.data);
      form.setFieldsValue(res.data.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.response?.data.message);
      }
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const basicProps: UploadProps = {
    name: "uploadFile",
    action: CommonConstant.baseUrl + "file/upload",
    headers: {
      Authorization: token,
    },
  };

  const imageProps: UploadProps = {
    ...basicProps,
    onChange(info) {
      setImages(info.fileList);
    },
  };

  const mp4Pros: UploadProps = {
    ...basicProps,
    onChange(info) {
      setMp4s(info.fileList);
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
        form={form}
        initialValues={data}
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
              <Select defaultValue={data?.type}>
                <Select.Option value="整租">整租</Select.Option>
                <Select.Option value="合租">合租</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="户型" name="houseType">
              <Select defaultValue={data?.houseType}>
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
                <Select.Option value="不限">不限</Select.Option>
                <Select.Option value="长租">长租</Select.Option>
                <Select.Option value="短租">长租</Select.Option>
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
              <Input.TextArea defaultValue={data?.location} />
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
              <Input.TextArea value={data?.description} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="图片">
          <Upload
            listType="picture-card"
            {...imageProps}
            maxCount={6}
            fileList={images}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="视频" name="mp4Urls">
          <Upload
            listType="picture-card"
            {...mp4Pros}
            maxCount={1}
            fileList={mp4s}
          >
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
