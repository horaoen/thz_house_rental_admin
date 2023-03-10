import { Avatar, Button, Descriptions, List, message, Typography } from "antd";
import Link from "antd/es/typography/Link";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../userTable";

export const UserDetail: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [reservations, setReservations] = useState<any>();
  const { userId } = useParams();
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const res1 = await axios.get(`/user/${userId}`);
      setUserInfo(res1.data.data);
      const res2 = await axios.get("/reservation/list", {
        params: {
          userId: userId,
        },
      });
      setReservations(res2.data.data);
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

  function handleReservationClick(houseId: string) {
    navigate(`/house/${houseId}/detail`);
  }

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          navigate(-1);
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
        <Descriptions.Item label="昵称">{userInfo?.nickName}</Descriptions.Item>
        <Descriptions.Item label="手机号">{userInfo?.phone}</Descriptions.Item>
        <Descriptions.Item label="喜欢数量">
          {userInfo?.likeNum}
        </Descriptions.Item>
        <Descriptions.Item label="收藏数">
          {userInfo?.collectNum}
        </Descriptions.Item>
        <Descriptions.Item label="需求数">
          {userInfo?.requireNum}
        </Descriptions.Item>
      </Descriptions>
      <List
        bordered={true}
        dataSource={reservations?.records}
        rowKey="id"
        renderItem={(item: any) => (
          <List.Item
            onClick={() => {
              handleReservationClick(item.houseId);
            }}
            style={{
              margin: "0 10%"
            }}
          >
            <Typography.Text>位置：{item.houseLocation}</Typography.Text>
            {item.isCollect ? (
              <Typography.Text>已预约</Typography.Text>
            ) : (
              <Typography.Text>已添加喜欢</Typography.Text>
            )}
          </List.Item>
        )}
      />
    </>
  );
};
