import axios from "../../request/axios";
import { useEffect, useState } from "react";
import { HouseQueryForm } from "./components/houseQueryForm";
import styles from "./HousePage.module.css";
import { HouseTable } from "./components/houseTable";
import { House } from "../../request/type";
import { Outlet } from "react-router-dom";

export const HousePage: React.FC = () => {
  const [data, setData] = useState<House[]>([]);

  useEffect(() => {
    async function loadingData() {
      const response = await axios.get("/house/list");
      console.log("res: ", response);
      setData(response.data.records);
    }
    loadingData();
  }, []);

  return (
    <div className={styles.container}>
      <HouseQueryForm />
      <HouseTable data={data} />
      <Outlet />
    </div>
  );
};
