import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { useTheme, styled } from "@material-ui/core/styles";
import { Card, CardHeader } from "@material-ui/core";
// utils
import { fNumber } from "../../../utils/formatNumber";
//
import { BaseOptionChart } from "../../charts";
import { Avatar, Grid, IconButton, Stack, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import * as actions from "src/actions/customer.action";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const CHART_DATA = [4344, 5435, 1443, 4443];

export default function AppCurrentVisits() {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState([]);
  const [image, setImage] = useState();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const user = useSelector((state) => state.customer.userAuth);
  const profile = useSelector((state) => state.customer.userById);
  useEffect(() => {
    dispatch(actions.findByIdUser(user));
  }, []);
  useEffect(() => {
    if (profile != undefined || profile != null) {
      setUserProfile(profile);
    }
  }, [profile]);
  useEffect(() => {
    if (userProfile !== undefined) {
      setImage(userProfile.avartar);
      setFirstName(userProfile.firstname);
      setLastName(userProfile.lastname);
      setPhone(userProfile.phone);
    }
  }, [userProfile]);
  //console.log("firstname", firstname);
  return (
    <Card style={{ height: "550px" }}>
      <CardHeader title="Thông tin chung" style={{ padding: "20px" }} />
      <div
        style={{
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginBottom: "20px",
        }}
      >
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <Avatar
            src={image}
            style={{
              width: "150px",
              height: "150px",
            }}
            variant="circle"
          ></Avatar>
        </IconButton>
      </div>
      <h3 style={{ textAlign: "center" }}>{firstname + " " + lastname}</h3>
      <h4 style={{ textAlign: "center" }}>{phone}</h4>
    </Card>
  );
}
