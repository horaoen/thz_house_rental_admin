import axios from "axios";
import { useState } from "react";
import { Page } from "../../type";
import { RequireTable } from "./component/requireTable";
import { RequireQueryForm } from "./component/requireQueryForm";
import styles from "./RequirementPage.module.css";

export const RequirementPage: React.FC = () => {
  const [page, setPage] = useState<Page>({
    pageNo: 1,
    pageSize: 10,
  });

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSearch = async (values: any) => {
    console.log({ ...values });
    const res = await axios.get("/requirement/list", {
      params: {
        ...values,
      },
    });
    setData(res.data.data.records);
    setTotal(res.data.data.total);
  };

  return (
    <div className={styles.container}>
      <RequireQueryForm
        handleSearch={handleSearch}
        page={page}
        onPageChange={setPage}
      />
      <RequireTable
        data={data}
        total={total}
        onPageChange={setPage}
        page={page}
      />
    </div>
  );
};
