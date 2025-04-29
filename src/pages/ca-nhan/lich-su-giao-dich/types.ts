import {Column} from "../../../components/tTable/types";

export const columnHistory: Array<Column> = [
  {id: "thoi_gian_text", label: "Thời gian"},
  {id: "loai_text", label: "Loại giao dịch", minWidth: 100},
  {id: "noi_dung", label: "Nội dung", minWidth: 200},
  {id: "so_du_truoc_text", label: "Số dư cũ", minWidth: 50, align: "right"},
  {id: "so_du_sau_text", label: "Số dư mới", minWidth: 50, align: "right"},
  {
    id: "so_tien_text",
    label: "Biến động số dư",
    minWidth: 50,
    align: "right",
  },
  {id: "actions", label: "Hành động", minWidth: 200, align: "right"},
];
