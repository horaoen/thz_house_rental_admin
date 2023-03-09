import { message } from "antd";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { House } from "../../request/type";

interface PropsType {
  houseId: string;
}
export const HouseCard: React.FC<PropsType> = ({ houseId }) => {
  const [data, setData] = useState<House>();

  async function fetchData() {
    try {
      const res = await axios.get("/house/get/{houseId}");
      setData(res.data.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        message.error(e.response?.data.message);
      }
    }
  }

  useEffect(() => {
    fetchData();
    console.log(data)
  }, []);
  return <h1>card</h1>;
};
