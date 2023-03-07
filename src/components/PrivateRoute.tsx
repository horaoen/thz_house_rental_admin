import { message, Spin } from "antd";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MainLayout } from "../layouts";
import { getTokenAtom, getCurrentUserAtom } from "../recoil/atom";

interface PropsType {
  children?: React.ReactNode;
}

export const PrivateRoute: React.FC<PropsType> = () => {
  const [token, setToken] = useRecoilState(getTokenAtom());
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(getCurrentUserAtom());

  async function fetchCurrentUser(token: string): Promise<any> {
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get("/auth/currentUser");
    return response.data;
  }

  function checkCurrentUser(currentUser: any): boolean {
    // TODO 检查角色
    return Object.keys(currentUser).length !== 0;
  }

  async function setup() {
    if (!checkCurrentUser(currentUser)) {
      if (token) {
        // recoil token
        console.log(token);
        try {
          const res = await fetchCurrentUser(token);
          if (checkCurrentUser(res)) {
            setCurrentUser(res);
          } else {
            navigate("/login");
          }
        } catch (e) {
          if (e instanceof AxiosError) message.error(e.response?.data.message);
          navigate("/login");
        }
      } else {
        // localStorage
        const jwt = localStorage.getItem("token");
        if (jwt) {
          setToken(jwt);
          try {
            const res = await fetchCurrentUser(jwt);
            if (checkCurrentUser(res)) setCurrentUser(res);
            else navigate("/login");
          } catch (e) {
            if (e instanceof AxiosError)
              message.error(e.response?.data.message);
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      }
    }
  }

  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checkCurrentUser(currentUser)) {
    return <MainLayout />;
  } else {
    return <Spin />;
  }
};
