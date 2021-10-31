// material
import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Container, Typography } from "@material-ui/core";
// components
import Page from "../../components/Page";
import * as actions from "src/actions/customer.action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppNewUsers,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits,
} from "../../components/_dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SET_USER_AUTHENTICATE = "user_authenticated";
  const user = useSelector((state) => state.customer.userAuth);

  // useEffect(() => {
  //  dispatch(actions.)
  // }, []);

  useEffect(() => {
    if (localStorage.getItem(SET_USER_AUTHENTICATE) === "undefined") {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <Page title="Trang chủ | WeeAllo">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AppNewUsers />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
