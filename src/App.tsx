import "antd/dist/reset.css";
import axios from "axios";
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { RecoilEnv, useRecoilValue } from "recoil";
import { getTokenAtom } from "./recoil/atom";
import { router } from "./router";

const App: React.FC = () => {
  const token = useRecoilValue(getTokenAtom());

  // const devUrl = "https://localhost:5000";
  const testUrl = "https://123.60.59.138:5000/";
  axios.defaults.baseURL = testUrl;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = token;
    axios.interceptors.request.use(function(config) {
      config.baseURL = testUrl;
      return config;
    });
  }, [token]);

  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  return <RouterProvider router={router} />;
};

export default App;
