import { Space, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getReservationListAtom } from "../../../../recoil/atom";
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
  const [reservationDataSource, setReservationDataSource] = useRecoilState(
    getReservationListAtom()
  );

  useEffect(() => {
    async function loadingData() {
      const response = await axios.get("/reservation/superList");
      setReservationDataSource(response.data.data.records);
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
            <Button type="link">房屋详情</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} rowKey="id" dataSource={reservationDataSource} />
  );
};
