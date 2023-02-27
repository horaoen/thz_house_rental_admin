import { Table } from "antd";
import { House } from "../../HousePage";

interface TableProps {
  data: House[];
}
export const HouseTable: React.FC<TableProps> = () => {
  return <Table></Table>;
};
