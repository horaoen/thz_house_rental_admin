import { Button, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { Link } from "react-router-dom";
import { House } from "../../../../request/type";
import { Page } from "../../../../type";

interface PropsType {
  data: any[];
  total: number;
  onPageChange: Function;
  page: Page;
}
export const HouseTable: React.FC<PropsType> = ({
  data,
  total,
  onPageChange,
  page,
}) => {
  async function handleDelete(houseId: string) {
    await axios.delete("/house/delete", {
      params: {
        houseId: houseId,
      },
    });
    // todo handle delete
    onPageChange({pageNo: 1, pageSize: 10})
  }

  const columns: ColumnsType<House> = [
    {
      key: "leaseTerm",
      title: "租期",
      dataIndex: "leaseTerm",
    },
    {
      key: "type",
      title: "租房类型",
      dataIndex: "type",
    },
    {
      key: "houseType",
      title: "户型",
      dataIndex: "houseType",
    },
    {
      key: "price",
      title: "价格",
      dataIndex: "price",
    },
    {
      key: "location",
      title: "位置",
      dataIndex: "location",
    },
    {
      key: "deposit",
      title: "押金",
      dataIndex: "deposit",
    },
    {
      key: "area",
      title: "面积",
      dataIndex: "area",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/house/${record.id}/detail`}>
            <Button type="link">详情</Button>
          </Link>
          <Link to={`/house/${record.id}/edit`}>
            <Button type="link">编辑</Button>
          </Link>
          <Popconfirm
            placement="top"
            title="确定删除吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey="id"
      dataSource={data}
      pagination={{
        current: page.pageNo,
        onChange: (page, pageSize) => {
          onPageChange({ pageNo: page, pageSize: pageSize });
          console.log(page, pageSize);
        },
        total: total,
      }}
    />
  );
};
