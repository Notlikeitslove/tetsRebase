import { FC, useCallback, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout, updateInfo, updatePermisson } from "../redux/auth/auth.slice";
import { Permission } from "../types";
import { APIServices } from "../utils";
import { RouterLink } from "./routers";

type RouterProps = {
  module?: string;
  action?: string;
  requireLogin?: boolean;
};

const ProtectedOutlet: FC<RouterProps> = ({ requireLogin = false }) => {
  const { isLogin } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const loadPermission = useCallback(async () => {
    try {
      const request = await APIServices.Auth.getPermission();
      const { data } = request;
      const { permisisons } = data;

      if (Array.isArray(permisisons)) {
        const ix: Array<Permission> = permisisons.map((i) => {
          return {
            module: i?.module,
            action: i?.action,
          };
        });

        dispatch(updatePermisson(ix));
      }
    } catch {}
  }, [dispatch]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const ans = await APIServices.Auth.checkToken();
        const { data: user } = ans;
        dispatch(
          updateInfo(user)
        );
      } catch {
        dispatch(logout());
      }
    };

    checkToken();
  }, [dispatch, location]);

  useEffect(() => {
    loadPermission();
  }, [loadPermission]);

  if (requireLogin && !isLogin) return <Navigate to={RouterLink.LOGIN} />;

  return <Outlet />;
};

export default ProtectedOutlet;
