import { Space, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getUserListAtom } from "../../../../recoil/atom";

export interface User {
  userId: string;
  phone?: string;
  wechatId?: string;
  email?: string;
  nickName?: string;
  collectNum?: number;
  likeNum?: number;
  requireNum?: number;
}

export const UserTable: React.FC = () => {
  const [userDataSource, setUseDataSource] = useRecoilState(getUserListAtom());

  useEffect(() => {
    async function loadingData() {
      const response = await axios.get("/user/list");
      setUseDataSource(response.data.data.records);
    }
    loadingData();
  }, []);

  const columns: ColumnsType<User> = [
    {
      key: "nickName",
      title: "昵称",
      dataIndex: "nickName",
    },
    {
      key: "phone",
      title: "手机号",
      dataIndex: "phone",
    },
    {
      key: "collectNum",
      title: "收藏数",
      dataIndex: "collectNum",
    },
    {
      key: "likeNum",
      title: "喜欢数",
      dataIndex: "likeNum",
    },
    {
      key: "requireNum",
      title: "需求数",
      dataIndex: "requireNum",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/user/${record.userId}/detail`}>
            <Button type="link">详情</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} rowKey="userId" dataSource={userDataSource} />
  );
};
