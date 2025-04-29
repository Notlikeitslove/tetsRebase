import { Navigate } from "react-router-dom";
import { MainLayout } from "../layouts";
import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { NguoiDungPage } from "../pages/management/nguoi-dung";
import { PhanQuyenPage } from "../pages/management/quyen";
import { VaiTroPage } from "../pages/management/vai-tro";
import { SystemAction, SystemFeatures } from "../types";
import ProtectedOutlet from "./protected-outlet";
import { RouterLink } from "./routers";

const MainRoutes = [
  { path: "*", element: <Navigate to={RouterLink.LOGIN} replace /> },

  {
    path: RouterLink.LOGIN,
    element: <LoginPage />,
  },
  {
    key: "private",
    path: "",
    element: <ProtectedOutlet requireLogin={true} />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: RouterLink.HOME,
            element: <HomePage />,
          },
          {
            path: RouterLink.QUAN_LY_NGUOI_DUNG,
            element: <NguoiDungPage />,
            module: SystemFeatures.QuanLyNguoiDung,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.QUAN_LY_DON_VI,
            element: <NguoiDungPage />,
            module: SystemFeatures.QuanLyDonVi,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.QUAN_LY_VAI_TRO,
            element: <VaiTroPage />,
            module: SystemFeatures.ManagerSystem,
            action: [SystemAction.View, SystemAction.Edit],
          },
          {
            path: RouterLink.QUAN_LY_PHAN_QUYEN,
            element: <PhanQuyenPage />,
            module: SystemFeatures.ManagerSystem,
            action: [SystemAction.View, SystemAction.Edit],
          },
        ],
      },
    ],
  },
];

export default MainRoutes;
