import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export async function loader({ params }) {
  const response = await axios.get(`/house/get/${params.houseId}`);
  const data = response.data;
  return data;
}

export const HouseDetail: React.FC = () => {
  const data = useLoaderData();

  useEffect(() => {
    console.log(data);
  });
  return <h1>detail</h1>;
};
