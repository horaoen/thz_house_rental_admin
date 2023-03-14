import "antd/dist/reset.css";
import axios from "axios";
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { RecoilEnv, useRecoilValue } from "recoil";
import { CommonConstant } from "./constant/constants";
import { getTokenAtom } from "./recoil/atom";
import { router } from "./router";

const App: React.FC = () => {
  const token = useRecoilValue(getTokenAtom());

  axios.defaults.baseURL = CommonConstant.baseUrl;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.withCredentials = true;

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
