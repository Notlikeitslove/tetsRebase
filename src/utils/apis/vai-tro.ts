import createApiServices from "./make-api-request";

const api = createApiServices();

const getListEntity = async (pageIndex = 1, pageSize = 10, keyword = "") => {
  const ans = await api.makeAuthRequest({
    url: `/roles?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
    method: "GET",
  });

  return ans?.data;
};

const getDetailEntity = async (id: string) => {
  const ans = await api.makeAuthRequest({
    url: `/roles/${id}`,
    method: "GET",
  });

  return ans?.data;
};

const insertEntity = (entity: any) => {
  return api.makeAuthRequest({
    url: "/roles",
    method: "POST",
    data: entity,
  });
};

const removeEntity = (id: string) => {
  return api.makeAuthRequest({
    url: `/roles/${id}`,
    method: "DELETE",
  });
};

const updateEntity = (id: string, entity: any = {}) => {
  return api.makeAuthRequest({
    url: `/roles/${id}`,
    method: "PUT",
    data: entity,
  });
};

export const getQuyenCuaVaiTro = async (
  id: string,
  pageIndex = 1,
  pageSize = 10,
  keyword = ""
) => {
  
  const ans = await api.makeAuthRequest({
    url: `/roles/permissions/${id}?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
    method: "GET",
  });
  return ans?.data;
};

export const insertQuyen = (entity: any = {}) => {
  return api.makeAuthRequest({
    url: "/permissions",
    method: "POST",
    data: entity,
  });
};

export const removeQuyen = (id: string) => {
  return api.makeAuthRequest({
    url: `/permissions/${id}`,
    method: "DELETE",
  });
};

export const VaiTroService = {
  getListEntity,
  getDetailEntity,
  insertEntity,
  updateEntity,
  removeEntity,
  getQuyenCuaVaiTro,
  insertQuyen,
  removeQuyen,
};
