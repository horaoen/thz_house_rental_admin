import { Outlet } from "react-router-dom";
import { RequireTable } from "./component/requieTable";
import { RequireQueryForm } from "./component/requireQueryForm";

export const RequirementPage: React.FC = () => {
  return (
    <>
      <RequireQueryForm />
      <RequireTable />
      <Outlet />
    </>
  );
};
