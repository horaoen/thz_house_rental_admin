import "antd/dist/reset.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HousePage, LoginPage, RequirementPage, UserPage } from "./pages";
import { RecoilEnv, RecoilRoot } from "recoil";
import { ReservationPage } from "./pages/reservation/ReservationPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { HouseDetail } from "./pages/house/components/houseDetail";
import { HouseEdit } from "./pages/house/components/houseEdit";

const App: React.FC = () => {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<HousePage />} />

              <Route path="house">
                <Route index element={<HousePage />} />
                <Route path=":houseId/edit" element={<HouseEdit />} />
                <Route path=":houseId/detail" element={<HouseDetail />} />
              </Route>

              <Route path="requirement" element={<RequirementPage />} />
              <Route path="reservation" element={<ReservationPage />} />
              <Route path="user" element={<UserPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
};

export default App;
