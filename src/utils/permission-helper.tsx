import { FaCheckCircle, FaCheckDouble, FaEdit, FaEye, FaFileAlt } from "react-icons/fa";
import { SystemAction, SystemFeatures } from "../types";

// 🔹 Object ánh xạ giữa Enum & Text hiển thị
const SystemFeaturesTextMap: Record<SystemFeatures, string> = {
  [SystemFeatures.QuanLyNguoiDung]: "Quản lý người dùng",
  [SystemFeatures.QuanLyVaiTro]: "Quản lý vai trò",
  [SystemFeatures.QuanLyDonVi]: "Quản lý đơn vị",
  [SystemFeatures.QuanLyQuyen]: "Quản lý quyền",
  [SystemFeatures.TroopReports]: "Báo cáo đơn vị",
  [SystemFeatures.ManagerRegisterLeave]: "Quản lý đăng ký nghỉ phép",
  [SystemFeatures.ManagerGuardDutty]: "Quản lý ca gác",
  [SystemFeatures.ManagerDuttySetting]: "Thiết lập ca gác",
  [SystemFeatures.ManagerPositions]: "Quản lý chức vụ",
  [SystemFeatures.ManagerProgresses]: "Quản lý quá trình",
  [SystemFeatures.ManagerDocuments]: "Quản lý tài liệu",
  [SystemFeatures.ManagerTrainings]: "Quản lý đào tạo",
  [SystemFeatures.ManagerPersonalDiarys]: "Quản lý nhật ký cá nhân",
  [SystemFeatures.WorkCalendar]: "Lịch công tác",
  [SystemFeatures.ManagerExperiences]: "Quản lý kinh nghiệm",
  [SystemFeatures.ManagerVehicle]: "Quản lý phương tiện",
  [SystemFeatures.RegisterVehicle]: "Đăng ký phương tiện",
  [SystemFeatures.VehicleCommand]: "Lệnh điều phương tiệng",
  [SystemFeatures.DeliveryBill]: "Phiếu giao nhận",
  [SystemFeatures.MeetingBook]: "Sổ họp",
  [SystemFeatures.ManagerFuel]: "Quản lý nhiên liệu",
  [SystemFeatures.ManagerWorkAddress]: "Quản lý địa chỉ làm việc",
  [SystemFeatures.ManagerTask]: "Quản lý công việc",
  [SystemFeatures.ManagerTrackDiscipline]: "Quản lý theo dõi kỷ luật",
  [SystemFeatures.StatisticDocument]: "Thống kê tài liệu",
  [SystemFeatures.ManagerTrackWork]: "Quản lý theo dõi công việc",
  [SystemFeatures.AccessControl]: "Kiểm soát truy cập",
  [SystemFeatures.StatisticWebC86]: "Thống kê Web C86",
  [SystemFeatures.GoingCall]: "Cuộc gọi đi",
  [SystemFeatures.InComingCall]: "Cuộc gọi đến",
  [SystemFeatures.ManagerTypeBook]: "Quản lý loại sách",
  [SystemFeatures.KHHLCDNam]: "Kế hoạch huấn luyện chiến đấu năm",
  [SystemFeatures.KHHLCDGD1]: "Kế hoạch huấn luyện chiến đấu giai đoạn 1",
  [SystemFeatures.KHHLCDGD2]: "Kế hoạch huấn luyện chiến đấu giai đoạn 2",
  [SystemFeatures.KHHLCDThang]: "Kế hoạch huấn luyện chiến đấu tháng",
  [SystemFeatures.TTBHLCDTuan]: "Thông báo huấn luyện chiến đấu tuần",
  [SystemFeatures.MLHLCDNam]: "Mệnh lệnh huấn luyện chiến đấu năm",
  [SystemFeatures.HDKHHLCDNam]: "Hướng dẫn kế hoạch huấn luyện chiến đấu năm",
  [SystemFeatures.HDKHHLCDGD1]: "Hướng dẫn kế hoạch huấn luyện chiến đấu giai đoạn 1",
  [SystemFeatures.HDKHHLCDGD2]: "Hướng dẫn kế hoạch huấn luyện chiến đấu giai đoạn 2",
  [SystemFeatures.TKHLCum]: "Tổng kết huấn luyện cụm",
  [SystemFeatures.TKHLTrungTam]: "Tổng kết huấn luyện trung tâm",
  [SystemFeatures.TKHLBTL]: "Tổng kết huấn luyện bộ tư lệnh",
  [SystemFeatures.BCHLTuan]: "Báo cáo huấn luyện tuần",
  [SystemFeatures.BCHLThang]: "Báo cáo huấn luyện tháng",
  [SystemFeatures.BCHLQuy]: "Báo cáo huấn luyện quý",
  [SystemFeatures.BCHL6Thang]: "Báo cáo huấn luyện 6 tháng",
  [SystemFeatures.BCHL9Thang]: "Báo cáo huấn luyện 9 tháng",
  [SystemFeatures.BCHLNam]: "Báo cáo huấn luyện năm",
  [SystemFeatures.ThongQuaGiaoAn]: "Thông qua giáo án",
  [SystemFeatures.GiaoAnHuanLuyen]: "Giáo án huấn luyện",
  [SystemFeatures.RutKinhNghiemHL]: "Rút kinh nghiệm huấn luyện",
  [SystemFeatures.SoHocTapCaNhan]: "Sổ học tập cá nhân",
  [SystemFeatures.EvaluateTraining]: "Đánh giá huấn luyện",
  [SystemFeatures.ManagerObjectTraining]: "Quản lý đối tượng huấn luyện",
  [SystemFeatures.ManagerSystem]: "Quản trị hệ thống",
};

export const getTextOfChucNang = (chucNang: SystemFeatures): string => {
  return SystemFeaturesTextMap[chucNang] || "Chức năng không xác định";
};

const SystemQuyenColorMap: Record<SystemAction, string> = {
  [SystemAction.View]: "#4CAF50",
  [SystemAction.Edit]: "#2196F3",
  [SystemAction.Approve]: "#00d83e",
  [SystemAction.Report]: "#f8d000",
  [SystemAction.UnitApprove]: "#eb0012"
};

export const getColorOfQuyen = (quyen: SystemAction) => {
  return SystemQuyenColorMap[quyen] || "#757575";
};

const SystemQuyenIconMap: Record<SystemAction, any> = {
  [SystemAction.View]: <FaEye />,
  [SystemAction.Edit]: <FaEdit />,
  [SystemAction.Approve]: <FaCheckCircle />,
  [SystemAction.Report]: <FaFileAlt />,
  [SystemAction.UnitApprove]: <FaCheckDouble />,
};

export const getIconOfQuyen = (quyen: SystemAction) => {
  return SystemQuyenIconMap[quyen] || <FaEye />; // Mặc định trả về FaEye nếu không tìm thấy
};

export const getOptionsFromEnum = <T extends Record<string, string>>(
  enumObject: T,
  textMap: Record<T[keyof T], string>
): { value: string; label: string }[] => {
  return Object.values(enumObject).map((key) => ({
    value: key,
    label: textMap[key] || key, // Nếu không có trong textMap thì dùng key
  }));
};

export const SystemFeaturesOptions = getOptionsFromEnum(
  SystemFeatures,
  SystemFeaturesTextMap
);

export const SystemActionsTextMap: Record<SystemAction, string> = {
  [SystemAction.View]: "Xem",
  [SystemAction.Edit]: "Sửa",
  [SystemAction.Approve]: "Duyệt",
  [SystemAction.Report]: "Báo cáo",
  [SystemAction.UnitApprove]: "Không duyệt"
};

export const getTextOfAction = (action: SystemAction): string => {
  return SystemActionsTextMap[action] || "Hành động không xác địng";
};

// 🟢 Lấy danh sách options cho SystemActions
export const SystemActionsOptions = getOptionsFromEnum(
  SystemAction,
  SystemActionsTextMap
);
