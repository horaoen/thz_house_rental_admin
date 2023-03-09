import { Button, Descriptions, message } from "antd";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../userTable";

interface UserDetailInfo extends User {
  reservations: any[];
  requirements: any[];
}

export const UserDetail: React.FC = () => {
  const [data, setData] = useState<UserDetailInfo>();
  const { userId } = useParams();
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const res = await axios.get(`/user/${userId}`);
      setData(res.data.data);
      console.log(res.data.data);
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

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          navigate("/user");
        }}
        style={{
          position: "relative",
          top: "10px",
          left: "20px",
        }}
      >
        返回
      </Button>

      <Descriptions bordered style={{ margin: "30px 100px" }}>
        <Descriptions.Item label="昵称">{data?.nickName}</Descriptions.Item>
        <Descriptions.Item label="手机号">{data?.phone}</Descriptions.Item>
        <Descriptions.Item label="喜欢数量">{data?.likeNum}</Descriptions.Item>
        <Descriptions.Item label="收藏数">{data?.collectNum}</Descriptions.Item>
        <Descriptions.Item label="需求数">{data?.requireNum}</Descriptions.Item>
      </Descriptions>
    </>
  );
};
