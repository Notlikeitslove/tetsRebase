import { Column } from "../../../components/tTable/types";


export type VaiTroUI = {
  _id: string;
  ten: string;
  mo_ta: string;
  module?: string | number; // Giả định có trường module để map với SystemFeatures
  action?: string | number;
};

export const columns: Array<Column> = [
  { id: "name", label: "Tên", minWidth: 200, },
  { id: "description", label: "Mô tả", minWidth: 150 },
  { id: "actions", label: "Hành động", minWidth: 200, align: "right" },
];

export const columnForms = [
  { id: "name", label: "Tên vai trò", type: "text", required: true },
  { id: "description", label: "Mô tả", type: "textarea" },
];
