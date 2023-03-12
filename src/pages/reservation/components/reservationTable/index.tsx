import { Space, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ReservationTable: React.FC = () => {
  const [dataSource, setDatasource] = useState<any>();

  useEffect(() => {
    async function loadingData() {
      const response = await axios.get("/reservation/list");
      setDatasource(response.data.data.records);
    }
    loadingData();
  }, []);

  const columns: ColumnsType<any> = [
    {
      key: "userName",
      title: "昵称",
      dataIndex: "userName",
    },
    {
      key: "phone",
      title: "手机号",
      dataIndex: "phone",
    },
    {
      key: "houseLocation",
      title: "房屋地址",
      dataIndex: "houseLocation",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/house/${record.houseId}/detail`}>
            <Button type="link">详情</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} rowKey="id" dataSource={dataSource} />;
};
