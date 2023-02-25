import "antd/dist/reset.css";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage } from "./pages";
import { RecoilEnv, RecoilRoot, useRecoilValue } from "recoil";
import { getTokenAtom } from "./recoil/atom";

interface PropsType {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PropsType> = ({ children }) => {
  const token = useRecoilValue(getTokenAtom());
  const res = token || localStorage.getItem("token");

  return res ? <>{children}</> : <Navigate to="/login" />;
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
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
};

export default App;
