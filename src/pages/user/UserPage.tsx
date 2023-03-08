import { Outlet } from "react-router-dom";
import { UserQueryForm } from "./components/userQueryForm";
import { UserTable } from "./components/userTable";
import style from "./UserPage.module.css";

export const UserPage: React.FC = () => {
  return (
    <div className={style.container}>
      <UserQueryForm />
      <UserTable />
      <Outlet />
    </div>
  );
};
