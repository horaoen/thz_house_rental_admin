import axios from "../../request/axios";
import { useEffect, useState } from "react";
import { HouseQueryForm } from "./components/HouseQueryForm";
import { HouseTable } from "./components/HouseTable";

export interface House {
  id: string;
  landlord: string;
  leaseTerm: string;
  type: string;
  houseType: string;
  price: number;
  location: string;
  deposit: number;
  area: number;
  floor: number;
  description: string;
  tag: string;
}
export const HousePage: React.FC = () => {
  const [data, setData] = useState<House[]>([]);

  useEffect(() => {
    async function loadingData() {
      const response = await axios.get("/house/list");
      console.log(response);
      setData(response.data);
    }
    loadingData();
  }, []);

  return (
    <>
      <HouseQueryForm />
      <HouseTable data={data}/>
    </>
  );
};
