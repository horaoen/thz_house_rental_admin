import { Space, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Page } from "../../../../type";

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

interface PropsType {
  data: any[];
  total: number;
  onPageChange: Function;
  page: Page;
}

export const UserTable: React.FC<PropsType> = ({
  data,
  total,
  onPageChange,
  page,
}) => {
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
    <Table
      columns={columns}
      rowKey="userId"
      dataSource={data}
      pagination={{
        current: page.pageNo,
        onChange: (page, pageSize) => {
          onPageChange({ pageNo: page, pageSize: pageSize });
        },
        total: total,
      }}
    />
  );
};
