import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
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
    console.log({ ...values });
    const res = await axios.get("/user/list", {
      params: {
        ...values,
      },
    });
    setData(res.data.data.records);
    setTotal(res.data.data.total);
  };

  useEffect(() => {
    handleSearch(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={style.container}>
      <UserQueryForm
        handleSearch={handleSearch}
        page={page}
        onPageChange={setPage}
      />
      <UserTable data={data} total={total} onPageChange={setPage} page={page} />
      <Outlet />
    </div>
  );
};
