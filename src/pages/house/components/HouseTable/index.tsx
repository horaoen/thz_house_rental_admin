import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { House } from "../../HousePage";

interface TableProps {
  data: House[];
}

export const HouseTable: React.FC<TableProps> = ({data}) => {
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
  ];
  
  useEffect(() => {
    console.log(data)
  })
  return <Table columns={columns} dataSource={data}/>
};
