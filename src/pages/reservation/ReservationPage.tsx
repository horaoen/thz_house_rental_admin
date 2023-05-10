import { useState } from "react";
import { Page } from "../../type";
import { ReservationQueryForm } from "./components/reservationQueryForm";
import { ReservationTable } from "./components/reservationTable";
import styles from "./ReservationPage.module.css";
import axios from "axios";

export const ReservationPage: React.FC = () => {

  const [page, setPage] = useState<Page>({
    pageNo: 1,
    pageSize: 10,
  });

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSearch = async (values: any) => {
    console.log({ ...values });
    const res = await axios.get("/reservation/superList", {
      params: {
        ...values,
      },
    });
    console.log(res);
    setData(res.data.data.records);
    setTotal(res.data.data.total);
  };
  return (
    <div className={styles.container}>
      <ReservationQueryForm
        handleSearch={handleSearch}
        page={page}
        onPageChange={setPage} />
      <ReservationTable
        data={data}
        total={total}
        onPageChange={setPage}
        page={page} />
    </div>
  );
};
