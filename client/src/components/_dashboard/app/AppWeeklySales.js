import { Icon } from "@iconify/react";
// import UserOutLined from "@iconify/icons-ant-design/android-filled";
// material
import { useState, useEffect } from "react";
import { alpha, styled } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "src/actions/contact.action";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

export default function AppWeeklySales() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.customer.userAuth);
  const friend = useSelector((state) => state.contact.countFriend);
  useEffect(() => {
    dispatch(actions.countFriend(user));
  }, []);
  //console.log("count", friend);

  const changePage = () => {
    navigate("/dashboard/contact", { replace: true });
  };
  return (
    <RootStyle style={{ cursor: "pointer" }} onClick={changePage}>
      <IconWrapperStyle>
        {/* <Icon icon={UserOutLined} width={24} height={24} /> */}
        <PersonIcon />
      </IconWrapperStyle>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Số lượng người bạn
      </Typography>
      <Typography variant="h3">
        {friend === undefined ? "0" : friend}
      </Typography>
    </RootStyle>
  );
}
