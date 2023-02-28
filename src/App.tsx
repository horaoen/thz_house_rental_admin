import "antd/dist/reset.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, HousePage, LoginPage, UserPage } from "./pages";
import { RecoilEnv, RecoilRoot } from "recoil";
import { ReservationPage } from "./pages/reservation/ReservationPage";
import { PrivateRoute } from "./components/PrivateRoute";

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
