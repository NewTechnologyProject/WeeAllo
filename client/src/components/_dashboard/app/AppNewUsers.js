import { Icon } from "@iconify/react";
import GroupIcon from "@material-ui/icons/Group";
// material
import { alpha, styled } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "src/actions/usergroup.action";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const user = useSelector((state) => state.customer.userAuth);
  //const group = useSelector((state) => state.usergroup.countGroup);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/usergroups/groups/${user}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, []);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <GroupIcon />
      </IconWrapperStyle>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Số lượng nhóm chat
      </Typography>
      <Typography variant="h3">{data === undefined ? "0" : data}</Typography>
    </RootStyle>
  );
}
