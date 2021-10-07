import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import { Tab, Box } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@material-ui/core";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import { useNavigate } from "react-router-dom";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../components/_dashboard/user";
//
import USERLIST from "../_mocks_/user";

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
        <Typography variant="h4" gutterBottom>
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
            <TabPanel value="1"></TabPanel>
            <TabPanel value="2"></TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
}
