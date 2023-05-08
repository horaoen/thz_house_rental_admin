import axios from "axios";
import { useState } from "react";
import { Page } from "../../type";
import { UserQueryForm } from "./components/userQueryForm";
import { UserTable } from "./components/userTable";
import style from "./UserPage.module.css";

export const UserPage: React.FC = () => {
  const [page, setPage] = useState<Page>({
    pageNo: 1,
    pageSize: 10,
  });

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSearch = async (values: any) => {
    const res = await axios.get("/user/list", {
      params: {
        ...values,
      },
    });
    setData(res.data.data.records);
    setTotal(res.data.data.total);
  };

  return (
    <div className={style.container}>
      <UserQueryForm
        handleSearch={handleSearch}
        page={page}
        onPageChange={setPage}
      />
      <UserTable data={data} total={total} onPageChange={setPage} page={page} />
    </div>
  );
};
