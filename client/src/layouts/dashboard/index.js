import { useState } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@material-ui/core/styles";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

// ----------------------------------------------------------------------

/*
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

FONT SIZE SYSTEM (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
*/

// const DRAWER_WIDTH = 280;
// const APPBAR_MOBILE = 64;
// const APPBAR_DESKTOP = 92;

const APP_BAR_MOBILE = 48;
const APP_BAR_DESKTOP = 64;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 8,
  paddingBottom: theme.spacing(0),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 8,
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
