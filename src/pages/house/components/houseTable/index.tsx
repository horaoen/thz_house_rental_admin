import { Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { House } from "../../../../request/type";

interface TableProps {
  data: House[];
}

export const HouseTable: React.FC<TableProps> = ({ data }) => {
  const columns: ColumnsType<House> = [
    {
      title: "租期",
      dataIndex: "leaseTerm",
    },
    {
      title: "租房类型",
      dataIndex: "type",
    },
    {
      title: "户型",
      dataIndex: "houseType",
    },
    {
      title: "价格",
      dataIndex: "price",
    },
    {
      title: "位置",
      dataIndex: "location",
    },
    {
      title: "押金",
      dataIndex: "deposit",
    },
    {
      title: "面积",
      dataIndex: "area",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/house/${record.id}/detail`}>详情</Link>
          <Link to={`/house/${record.id}/detail`}>编辑</Link>
          <Link to={`/house/${record.id}/delete`}>删除</Link>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    console.log(data);
  });
  return <Table columns={columns} dataSource={data} />;
};
