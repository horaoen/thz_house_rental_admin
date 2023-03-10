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
    action: "http://123.60.78.147:5000/file/upload",
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
              label="??????"
              name="price"
              rules={[{ required: true, message: "???????????????" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="??????" name="area">
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="??????" name="deposit">
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={7}>
            <Form.Item label="??????" name="type">
              <Select defaultValue={data?.type}>
                <Select.Option value="??????">??????</Select.Option>
                <Select.Option value="??????">??????</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="??????" name="houseType">
              <Select defaultValue={data?.houseType}>
                <Select.Option value="?????????">?????????</Select.Option>
                <Select.Option value="?????????">?????????</Select.Option>
                <Select.Option value="?????????">?????????</Select.Option>
                <Select.Option value="??????????????????">??????????????????</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="??????" name="leaseTerm">
              <Select>
                <Select.Option value="??????">??????</Select.Option>
                <Select.Option value="??????">??????</Select.Option>
                <Select.Option value="??????">??????</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="??????"
              name="location"
              rules={[{ required: true, message: "?????????????????????" }]}
            >
              <Input.TextArea defaultValue={data?.location} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="????????????"
              name="description"
              rules={[{ required: true, message: "?????????????????????" }]}
            >
              <Input.TextArea value={data?.description} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="??????">
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
        <Form.Item label="??????" name="mp4Urls">
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
              ??????
            </Button>
          </Col>
          <Col span={6}>
            <Button type="default" onClick={() => navigate(-1)}>
              ??????
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
