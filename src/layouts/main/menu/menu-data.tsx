import {
  IoCashOutline,
  IoSettings
} from "react-icons/io5";
import {
  MdAdminPanelSettings
} from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { RouterKey, RouterLink } from "../../../routers/routers";
import { SideMenuItem, SystemAction, SystemFeatures } from "../../../types";

export const menus: Array<SideMenuItem> = [
  {
    key: RouterLink.HOME,
    icon: <RiDashboardLine />,
    text: "Trang chủ",
    children: [],
    url: RouterLink.HOME,
  },
  {
    key: RouterKey.QUAN_LY_HE_THONG,
    icon: <IoSettings />,
    text: "Quản trị hệ thống",
    children: [
      {
        key: RouterLink.QUAN_LY_NGUOI_DUNG,
        icon: <IoCashOutline />,
        text: "Quân nhân",
        children: [],
        url: RouterLink.QUAN_LY_NGUOI_DUNG,
      },
      {
        key: RouterLink.QUAN_LY_DON_VI,
        icon: <IoCashOutline />,
        text: "Đơn vị",
        children: [],
        url: RouterLink.QUAN_LY_DON_VI,
      },
      {
        key: RouterLink.QUAN_LY_VAI_TRO,
        icon: <MdAdminPanelSettings />,
        text: "Vai trò",
        children: [],
        url: RouterLink.QUAN_LY_VAI_TRO,
        module: SystemFeatures.ManagerSystem,
        action: [SystemAction.View, SystemAction.Edit],
      },
    ]
  }
];
