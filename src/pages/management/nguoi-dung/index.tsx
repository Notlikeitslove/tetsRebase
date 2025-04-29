import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { TShowConfirm } from "../../../components";
import { TFormModal } from "../../../components/tFormModal";
import TSearchText from "../../../components/tSearchText";
import { TTable } from "../../../components/tTable";
import { useNotifier } from "../../../provider/NotificationProvider";
import { APIServices } from "../../../utils";
import {
  addActionToRows,
  addFieldToItems
} from "../../../utils/table-helper";
import * as styles from "./styles";
import { columnForms, columns } from "./types";

export const NguoiDungPage = () => {

  const [entities, setEntities] = useState<any>([]);
  const [currentEntity, setCurrentEntity] = useState<any | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const [modalConfirmRemove, setModalConfirmRemoveState] =
    useState<boolean>(false);

  const {success, error} = useNotifier();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<Record<string, any> | null>(
    null
  );

  // load data
  const loadData = async (
    requestSize = pageSize,
    requestIndex = pageIndex,
    requestText = ""
  ) => {
    try {
      const request = await APIServices.NguoiDungService.getListEntity(
        requestIndex,
        requestSize,
        requestText
      );
      const {items, total, page, size} = request;
      setEntities(items);
      setPageSize(size);
      setPageIndex(page);
      setTotal(total);
    } catch (e) {}
  };
  
  useEffect(() => {
    loadData();
  }, []);

  // handle
  const handleSearch = (value: string) => {
    loadData(pageSize, 1, value);
  };

  const handleEdit = row => {
    handleOpenModal(row);
  };

  const handleConfirmDelete = row => {
    setCurrentEntity(row);
    setModalConfirmRemoveState(true);
  };

  const handleRemove = async row => {
    try {
      await APIServices.DoiTuongService.removeEntity(row?._id);

      success("Xoá đối tượng thành công");
    } catch {
      error("Xoá đối tượng thất bại");
    } finally {
      setModalConfirmRemoveState(false);
      loadData();
    }
  };

  const handleOpenModal = (data?: Record<string, any>) => {
    setEditingData(data || {giam_gia: 0});
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingData({});
  };

  const handleSubmit = async (values: Record<string, any>) => {
    const {actions: _, ...data} = values;

    try {
      if (data._id) {
        await APIServices.DoiTuongService.updateEntity(data._id, data);
        success("Cập nhật đối tượng thành công");
      } else {
        await APIServices.DoiTuongService.insertEntity(data);
        success("Thêm đối tượng thành công");
      }
    } catch (ex) {
      if (values._id) error("Cập nhật đối tượng thất bại");
      else error("Thêm đối tượng thất bại");
    } finally {
      setModalOpen(false);
      loadData();
    }
  };

  let rowsRender = addFieldToItems(entities, "rank_full_name", (qn:any) => {
    let ans = ""
    if (qn?.rank) ans = ans + qn?.rank + " - "
    if (qn?.full_name) ans = ans + qn?.full_name
    
    return <Box sx={{color: "black"}}>{ans}</Box>
  });
  
  rowsRender = addFieldToItems(rowsRender, "unit_detail_name", (dv:any) => {
    let ans = ""
    if (dv?.unit_detail) ans = ans + dv?.unit_detail.name;
    return <Box sx={{color: "black"}}>{ans}</Box>
  });

  rowsRender = addFieldToItems(rowsRender, "doi_tuong_huan_luyen_ten", (dthl:any) => {
    let ans = ""
    if (dthl?.doi_tuong_huan_luyen_detail) ans = ans + dthl?.doi_tuong_huan_luyen_detail.ten;
    return <Box sx={{color: "black"}}>{ans}</Box>
  });

  rowsRender = addActionToRows(
    rowsRender,
    [
      {
        label: "Sửa",
        icon: <FaEdit />,
        color: "#0A8DEE",
        onClick: handleEdit,
      },
      {
        label: "Xoá",
        icon: <FaTrash />,
        color: "#ff6666",
        onClick: handleConfirmDelete,
      },
    ],
    "flex-end"
  );

    return (
      <Box sx={styles.container}> 
      <Box sx={styles.topBarStyle}>
        <Box>
        <Button
          variant="contained"
          startIcon={<IoAddCircle />}
          sx={styles.addButtonStyle}
          onClick={() => handleOpenModal()}
        >
          Thêm đối tượng
        </Button>
        </Box>
        <TSearchText onSearch={handleSearch} />
      </Box>

        <Box sx={styles.tableContainerStyle}>
          <TTable
            rows={rowsRender}
            columns={columns}
            showIndex={true}
            pageSize={pageSize}
            pageIndex={pageIndex}
            total={total}
            onChangePage={value => {
              loadData(pageSize, value);
            }}
            onRowPerPageChange={value => {
              loadData(value, 1);
            }}
          />
        </Box>

          <TFormModal
            open={modalOpen}
            onClose={handleCloseModal}
            columns={columnForms}
            initialValues={editingData}
            onSubmit={handleSubmit}
          />

          <TShowConfirm
            visible={modalConfirmRemove}
            title={"Thông báo"}
            message={`Bạn có chắc chắn xoá đối tượng [${currentEntity?.ten}] không?`}
            onConfirm={() => {
              setModalConfirmRemoveState(false);
              if (currentEntity) handleRemove(currentEntity);
            }}
            onClose={() => {
              setModalConfirmRemoveState(false);
            }}
            onCancel={() => {
              setModalConfirmRemoveState(false);
            }}
          />
      </Box>
    )
  }