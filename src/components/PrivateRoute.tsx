import { Spin } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MainLayout } from "../layouts";
import { getTokenAtom } from "../recoil/atom";

export const PrivateRoute: React.FC = () => {
  const [token, setToken] = useRecoilState(getTokenAtom());
  const navigate = useNavigate();

  async function setup() {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        setToken(jwt);
      } else {
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token) {
    return <MainLayout />;
  } else {
    return <Spin />;
  }
};
