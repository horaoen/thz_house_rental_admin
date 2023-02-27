import "antd/dist/reset.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { HomePage, HousePage, LoginPage } from "./pages";
import { RecoilEnv, RecoilRoot, useRecoilState } from "recoil";
import { getCurrentUserAtom, getTokenAtom } from "./recoil/atom";
import axios from "./request/axios";
import { AxiosError } from "axios";
import { message } from "antd";
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

  useEffect(() => {
    async function init() {
      // console.log("token: ", token, "currentUser: ", currentUser);
      if (currentUser) {
        setState(true);
      } else if (token) {
        axios.defaults.headers.common["Authorization"] = token;
        try {
          const response = await axios.get("/auth/currentUser");
          setCurrentUser(response.data);
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
          axios.defaults.headers.common["Authorization"] = jwt;
          try {
            const response = await axios.get("/auth/currentUser");
            setCurrentUser(response.data);
            setState(true);
          } catch (e) {
            if (e instanceof AxiosError) {
              message.error(e.response?.data.message);
            }
            navigate("/login");
          }
        }
      }
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { state } ? (
    <MainLayout>{children}</MainLayout>
  ) : (
    <Navigate to="/login" />
  );
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
