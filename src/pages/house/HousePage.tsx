import { HouseQueryForm } from "./components/houseQueryForm";
import styles from "./HousePage.module.css";
import { HouseTable } from "./components/houseTable";
import { Outlet } from "react-router-dom";

export const HousePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <HouseQueryForm />
      <HouseTable />
      <Outlet />
    </div>
  );
};
