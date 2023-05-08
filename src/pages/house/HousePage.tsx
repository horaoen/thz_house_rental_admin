import { HouseQueryForm } from "./components/houseQueryForm";
import styles from "./HousePage.module.css";
import { HouseTable } from "./components/houseTable";
import { useState } from "react";
import { Page } from "../../type";
import axios from "axios";

export const HousePage: React.FC = () => {
  const [page, setPage] = useState<Page>({
    pageNo: 1,
    pageSize: 10,
  });

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSearch = async (values: any) => {
    console.log("search: ", values);
    const res = await axios.get("/house/list", {
      params: {
        ...values,
      },
    });
    setData(res.data.data.records);
    setTotal(res.data.data.total);
  };

  return (
    <div className={styles.container}>
      <HouseQueryForm
        handleSearch={handleSearch}
        page={page}
        onPageChange={setPage}
      />
      <HouseTable
        data={data}
        total={total}
        onPageChange={setPage}
        page={page}
      />
    </div>
  );
};
