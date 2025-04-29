import {Box} from "@mui/system";
import * as styles from "./styles";
import {useEffect, useRef, useState} from "react";
import {APIServices} from "../../../utils";
import {TTable} from "../../../components/tTable";
import {addFieldToItems} from "../../../utils/table-helper";
import {columnHistory} from "./types";
import {formatDateTime, formatNumberVND} from "../../../utils/common";
import {getTextOfLoaiThanhToan} from "../../../utils/permission-helper";
import {Button} from "@mui/material";
import {useReactToPrint} from "react-to-print";
import {FaFilePdf} from "react-icons/fa";
import {useAppSelector} from "../../../hooks";
import {Print} from "./print";
import {isValuable} from "../../../utils/check";

export const LichSuGiaoDichCaNhanPage = () => {
  const [histories, setHistories] = useState<any>([]);
  const [pageSizeHistory, setPageSizeHistory] = useState<number>(10);
  const [pageIndexHistory, setPageIndexHistory] = useState<number>(1);
  const [totalHistory, setTotalHistory] = useState<number>(0);
  const [recordPrint, setRecordPrint] = useState<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    onAfterPrint: () => {
      setRecordPrint(null);
      document.title = "TLink - Kiến thức hội tụ, vững bước tương lai"; // ✅ reset sau khi in
    },
  });

  const loadHistory = async (
    requestSize = pageSizeHistory,
    requestIndex = pageIndexHistory
  ) => {
    try {
      const request = await APIServices.KeToanService.lichSuGiaoDichCaNhan(
        requestIndex,
        requestSize,
        ""
      );
      const {items, total, page, size} = request;
      setHistories(items);
      setPageSizeHistory(size);
      setPageIndexHistory(page);
      setTotalHistory(total);
    } catch (e) {}
  };

  useEffect(() => {
    loadHistory();
  }, []);

  let rowHistoryRender = addFieldToItems(
    histories,
    "so_du_truoc_text",
    (row: any) => {
      return formatNumberVND(row?.so_du_truoc ?? 0);
    }
  );
  rowHistoryRender = addFieldToItems(
    rowHistoryRender,
    "so_du_sau_text",
    (row: any) => {
      return formatNumberVND(row?.so_du_sau ?? 0);
    }
  );
  rowHistoryRender = addFieldToItems(
    rowHistoryRender,
    "so_tien_text",
    (row: any) => {
      return (
        <Box
          sx={{
            fontWeight: 550,
            display: "flex",
            gap: "5px",
            justifyContent: "flex-end",
            color: row?.so_tien > 0 ? "#28A745" : "red",
          }}
        >
          {row?.so_tien > 0 && "+"}
          {formatNumberVND(row?.so_tien ?? 0)}
        </Box>
      );
    }
  );
  rowHistoryRender = addFieldToItems(
    rowHistoryRender,
    "thoi_gian_text",
    (row: any) => {
      const dt = row?.created_date ? new Date(row?.created_date) : new Date();
      return formatDateTime(dt.toISOString());
    }
  );
  rowHistoryRender = addFieldToItems(
    rowHistoryRender,
    "loai_text",
    (row: any) => {
      return getTextOfLoaiThanhToan(row?.loai);
    }
  );

  rowHistoryRender = addFieldToItems(
    rowHistoryRender,
    "actions",
    (row: any) => {
      return (
        <>
          {row?.loai == "DangKiKhoaHoc" && (
            <Button
              variant="contained"
              onClick={() => {
                document.title = `Phiếu thu ${
                  isValuable(row?.so_phieu_thu) ? row?.so_phieu_thu : ""
                }`;
                setRecordPrint(row);
                setTimeout(() => handlePrint(), 0);
              }}
              startIcon={<FaFilePdf></FaFilePdf>}
              sx={{
                backgroundColor: "#0A8DEE", // Màu mặc định là xanh
                textTransform: "none !important",
              }}
            >
              Xuất phiếu thu
            </Button>
          )}
        </>
      );
    }
  );

  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleStyle}>Lịch sử thanh toán</Box>
      <Box sx={styles.tableContainerStyle}>
        <TTable
          rows={rowHistoryRender}
          columns={columnHistory}
          showIndex={true}
          pageSize={pageSizeHistory}
          pageIndex={pageIndexHistory}
          total={totalHistory}
          onChangePage={value => {
            loadHistory(pageSizeHistory, value);
          }}
          onRowPerPageChange={value => {
            loadHistory(value, 1);
          }}
        />
      </Box>
      {/* style={{display: "none"}} */}
      <div id="print" style={{display: "none"}}>
        <div ref={contentRef}>
          <Print data={recordPrint}></Print>
        </div>
      </div>
    </Box>
  );
};
