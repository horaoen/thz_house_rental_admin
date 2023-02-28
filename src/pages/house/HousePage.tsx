import axios from "../../request/axios";
import { useEffect, useState } from "react";
import { HouseQueryForm } from "./components/HouseQueryForm";
import { HouseTable } from "./components/HouseTable";

export interface House {
  id: string;
  landlord?: string;
  leaseTerm?: string;
  type?: string;
  houseType?: string;
  price?: number;
  location?: string;
  deposit?: number;
  area?: number;
  floor?: number;
  description?: string;
  tag?: string;
  mp4DownloadUrls?: string[];
  imageDownloadUrls?: string[];
  images?: string[];
  mp4s?: string[];
  imagesMap?: Map<string, string>;
  mp4sMap?: Map<string, string>;
}
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
    <>
      <HouseQueryForm />
      <HouseTable data={data} />
    </>
  );
};
