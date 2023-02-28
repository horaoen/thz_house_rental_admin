import { Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "antd/es/typography/Link";
import { useEffect } from "react";
import { House } from "../../HousePage";

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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link>详情</Link>
          <Link>编辑</Link>
          <Link>删除</Link>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    console.log(data);
  });
  return <Table columns={columns} dataSource={data} />;
};
