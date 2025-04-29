import { Column } from "../../components/tTable/types";
import { APIServices } from "../../utils";

export type NguoiDungUI = {
  _id: string;
  ho_ten: string;
  tai_khoan: string;
  phong_ban: string;
  vai_tro: string;
};

export const columns: Array<Column> = [
  {id: "rank_full_name", label: "Họ và tên", minWidth: 150},
  {id: "username", label: "Tên đăng nhập", minWidth: 150, align: "right"},
  {id: "unit_detail_name", label: "Đơn vị", minWidth: 150, align: "right"},
  {id: "doi_tuong_huan_luyen_ten", label: "Đối tượng huấn luyện", minWidth: 150, align: "right"},
  {id: "actions", label: "Hành động", minWidth: 150, align: "right"},
];

export const columnForms = [
  {id: "full_name", label: "Họ tên", type: "text", required: true},
  {id: "rank", label: "Cấp bậc", type: "select", required: true,
    options: [
      { value: "thieu-uy", label: "Thiếu úy" },
      { value: "trung-uy", label: "Trung úy" },
      { value: "thuong-uy", label: "Thượng úy" },
      { value: "dai-uy", label: "Đại úy" },
      { value: "thieu-ta", label: "Thiếu tá" },
      { value: "trung-ta", label: "Trung tá" },
      { value: "thuong-ta", label: "Thượng tá" },
      { value: "dai-ta", label: "Đại tá" },
      { value: "thieu-uy-cn", label: "Thiếu úy chuyên nghiệp" },
      { value: "trung-uy-cn", label: "Trung úy chuyên nghiệp" },
      { value: "thuong-uy-cn", label: "Thượng úy chuyên nghiệp" },
      { value: "dai-uy-cn", label: "Đại úy chuyên nghiệp" },
      { value: "thieu-ta-cn", label: "Thiếu tá chuyên nghiệp" },
      { value: "trung-ta-cn", label: "Trung tá chuyên nghiệp" },
      { value: "thuong-ta-cn", label: "Thượng tá chuyên nghiệp" }
    ]
  },
  {id: "unit", label: "Vai trò", type: "select-fetch", required: true,
    fetchOptions: async (input) => { // Hàm này có thể nhận input cho tìm kiếm
      try {
        const response = await APIServices.VaiTroService.getListEntity();
        const data = response.items;
        return data.map(item => (
          { value: item._id, label: item.name }
        ));
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu cấp bậc:", error);
        return [];
      }
    },
  },
];