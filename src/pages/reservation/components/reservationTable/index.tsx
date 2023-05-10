import { Space, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Page } from "../../../../type";

interface PropsType {
  data: any[];
  total: number;
  onPageChange: Function;
  page: Page;
}
export const ReservationTable: React.FC<PropsType> = ({
  data,
  total,
  onPageChange,
  page
}) => {



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
            <Button type="link">房屋详情</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns}
      rowKey="id"
      dataSource={data}
      pagination={{
        current: page.pageNo,
        onChange: (page, pageSize) => {
          onPageChange({ pageNo: page, pageSize: pageSize });
        },
        total: total
      }}
    />
  );
};
