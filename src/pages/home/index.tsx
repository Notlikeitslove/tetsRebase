
import { Box } from "@mui/material";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateInfo } from '../../redux/auth/auth.slice'; // Đường dẫn đến file authSlice
import { RootState } from '../../redux/store'; // Nếu bạn có RootState type
import { APIServices } from "../../utils";

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadingUser, setLoadingUser] = useState(false);
  const [errorUser, setErrorUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUser(true);
      setErrorUser(null);
      try {
        const res = await APIServices.Auth.getPermission();
        dispatch(updateInfo(res.data)); // Dispatch action lên Redux store
      } catch (error) {
        console.error("Lỗi khi gọi API lấy thông tin người dùng:", error);
        setErrorUser(error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  const userInfo = useSelector((state: RootState) => state.auth.info);
  const isUserLoggedIn = useSelector((state: RootState) => state.auth.isLogin);
  
  return (
    <Box>
      <Typography>Thông tin người dùng:</Typography>
      <Typography>Tên: {userInfo.full_name || "N/A"}</Typography>
      <Typography>Username: {userInfo.username || "N/A"}</Typography>
    </Box>
  );
};