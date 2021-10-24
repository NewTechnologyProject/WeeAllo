import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@material-ui/core/styles";
import { Box, Card, Link, Container, Typography } from "@material-ui/core";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import { Alert, AlertTitle } from "@material-ui/lab";
import AuthSocial from "../components/authentication/AuthSocial";
import Forgot from "src/components/authentication/login/Forgot";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterOTP() {
  return (
    <RootStyle title="ForgotPassWord | Minimal-UI">
      <AuthLayout>
        Đã có tài khoản ? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/login"
        >
          Đăng nhập Ngay !
        </Link>
      </AuthLayout>
      <Container>
        <ContentStyle>
          <Alert severity="warning">
            <AlertTitle>Cảnh báo</AlertTitle>
            Tài khoản đã được đăng ký —{" "}
            <strong>Vui lòng nhập mã xác thực!</strong>
          </Alert>
          <Forgot />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
