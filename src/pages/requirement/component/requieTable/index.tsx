import { Space, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const RequireTable: React.FC = () => {
  const [dataSource, setDatasource] = useState<any[]>();

  useEffect(() => {
    async function loadingData() {
      const response = await axios.get("/requirement/list");
      setDatasource(response.data.data.records);
    }
    loadingData();
  }, []);

  const columns: ColumnsType<any> = [
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
      key: "description",
      title: "详情描述",
      dataIndex: "description",
    },
    {
      key: "type",
      title: "租房类型",
      dataIndex: "type",
    },
    {
      key: "leaseTerm",
      title: "租期",
      dataIndex: "leaseTerm",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/user/${record.userId}/detail`}>
            <Button type="link">用户主页</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} rowKey="id" dataSource={dataSource} />;
};
