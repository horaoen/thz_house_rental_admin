import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { HousePage, LoginPage, RequirementPage, UserPage } from "./pages";
import { HouseDetail } from "./pages/house/components/houseDetail";
import { HouseEdit } from "./pages/house/components/houseEdit";
import { ReservationPage } from "./pages/reservation/ReservationPage";
import { HouseNew } from "./pages/house/components/houseNew";
import { UserDetail } from "./pages/user/components/userDetail";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<HousePage />} />

        <Route path="house">
          <Route index element={<HousePage />} />
          <Route path=":houseId/edit" element={<HouseEdit />} />
          <Route path=":houseId/detail" element={<HouseDetail />} />
          <Route path="new" element={<HouseNew />} />
        </Route>
        <Route path="requirement" element={<RequirementPage />} />
        <Route path="reservation" element={<ReservationPage />} />

        <Route path="user">
          <Route index element={<UserPage />} />
          <Route path=":userId/detail" element={<UserDetail />} />
        </Route>
      </Route>
    </Route>
  )
);
