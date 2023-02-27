import "antd/dist/reset.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { HomePage, HousePage, LoginPage, UserPage } from "./pages";
import { RecoilEnv, RecoilRoot, useRecoilState } from "recoil";
import { getCurrentUserAtom, getTokenAtom } from "./recoil/atom";
import axios from "./request/axios";
import { AxiosError } from "axios";
import { message, Spin } from "antd";
import { ReservationPage } from "./pages/reservation/ReservationPage";
import { MainLayout } from "./layouts";

interface PropsType {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PropsType> = ({ children }) => {
  // 通过的条件是能获得到curreneUser
  const [token, setToken] = useRecoilState(getTokenAtom());
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(getCurrentUserAtom());
  const [state, setState] = useState<Boolean>(false);

  async function fetchCurrentUser(token: string): Promise<any> {
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get("/auth/currentUser");
    return response.data;
  }

  function checkCurrentUser(currentUser: any): boolean {
    return Object.keys(currentUser).length !== 0;
  }

  async function init() {
    if (checkCurrentUser(currentUser)) {
      setState(true);
    } else if (token) {
      try {
        const currentUser = await fetchCurrentUser(token);
        setCurrentUser(currentUser);
        setState(true);
      } catch (e) {
        if (e instanceof AxiosError) {
          message.error(e.response?.data.message);
        }
        navigate("/login");
      }
    } else {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        setToken(jwt);
        try {
          const currentUser = await fetchCurrentUser(jwt);
          setCurrentUser(currentUser);
          setState(true);
        } catch (e) {
          if (e instanceof AxiosError) {
            message.error(e.response?.data.message);
          }
          navigate("/login");
        }
      }
      navigate("/login");
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MainLayout>{children}</MainLayout>;
};

const App: React.FC = () => {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <UserPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/house"
              element={
                <PrivateRoute>
                  <HousePage />
                </PrivateRoute>
              }
            />

            <Route
              path="/requirement"
              element={
                <PrivateRoute>
                  <ReservationPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/reservation"
              element={
                <PrivateRoute>
                  <ReservationPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
};

export default App;
