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
export const RequireTable: React.FC<PropsType> = ({
  data,
  total,
  onPageChange,
  page,
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

  return (
    <Table
      columns={columns}
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
