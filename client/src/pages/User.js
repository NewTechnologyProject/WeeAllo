import { Box, Container, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { filter } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import Page from "../components/Page";
import ChangePassWordForm from "./UserComponent/ChangePasswordForm";
import UserDetailForm from "./UserComponent/UserDetailForm";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "company", label: "Company", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "isVerified", label: "Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const SET_USER_AUTHENTICATE = "user_authenticated";
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (localStorage.getItem(SET_USER_AUTHENTICATE) === "undefined") {
      navigate("/login", { replace: true });
    }
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="User | Minimal-UI">
      <Container>
        {/* <Typography variant="h4" gutterBottom>
          Thông tin cá nhân
        </Typography> */}
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thông tin cá nhân
        </Typography>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Cập nhật thông tin" value="1" />
                <Tab label="Đổi mật khẩu" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <UserDetailForm />
            </TabPanel>
            <TabPanel value="2">
              <ChangePassWordForm />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
