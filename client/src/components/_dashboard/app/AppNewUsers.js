import GroupIcon from "@material-ui/icons/Group";
// material
import { alpha, styled } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
// utils
import { useDispatch, useSelector } from "react-redux";
import * as actions from "src/actions/customer.action";
import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter,
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.info.dark,
    0
  )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

export default function AppNewUsers() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.customer.userAuth);
  const listRooms = useSelector((state) => state.customer.listRooms);
  const navigate = useNavigate();

  const loadRoomsHandler = useCallback(() => {
    dispatch(actions.fetchAllRoom(userId));
  }, [userId, actions.fetchAllRoom]);

  useEffect(() => {
    loadRoomsHandler();
  }, [loadRoomsHandler]);

  const changePage = () => {
    navigate("/dashboard/groups", { replace: true });
  };

  const getTotalGroupChat = (list) => {
    let total = 0;
    for (let room of list) {
      if (room.creator) {
        total++;
      }
    }
    return total;
  };

  return (
    <RootStyle style={{ cursor: "pointer" }} onClick={changePage}>
      <IconWrapperStyle>
        <GroupIcon />
      </IconWrapperStyle>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Số lượng nhóm chat
      </Typography>
      <Typography variant="h3">
        {listRooms && listRooms.length > 0 ? getTotalGroupChat(listRooms) : 0}
      </Typography>
    </RootStyle>
  );
}
