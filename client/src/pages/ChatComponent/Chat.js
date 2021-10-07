// material
import { Grid, Button, Container, Stack, Typography } from "@material-ui/core";
// components
import Page from "src/components/Page";
//ort POSTS from '../_mocks_/blog';
import MessageChat from "./Message";
import SearchFriend from "./Search";
import ListFriendChat from "./ListFriendChat";
import { alpha, styled } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import * as actions from "src/actions/customer.action";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Chat.module.css";
import { useNavigate } from "react-router-dom";
import ChatInfomation from "./ChatInfomation";


const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

export default function Chat() {
<<<<<<< HEAD
  const [activeRoom, setActiveRoom] = useState(3);
=======
  const [activeRoom, setActiveRoom] = useState(null);
  const SET_USER_AUTHENTICATE = "user_authenticated";
  const navigate = useNavigate();
>>>>>>> caea27571a23312febb5ee53ca70670f67c943ff
  const dispatch = useDispatch();
  const listRooms = useSelector((state) => state.customer.listRooms);
  const userId = localStorage.getItem("user_authenticated");

  // Get list roomChat
  useEffect(() => {
    dispatch(actions.fetchAllRoom(userId));
    if (localStorage.getItem(SET_USER_AUTHENTICATE) === "undefined") {
      navigate("/login", { replace: true });
    }
  }, []);

  const getActiveRoom = (room) => {
    setActiveRoom(room);
  };

  return (
    <Page title="Chat | WeeAllo">
      <Container maxWidth="100%" style={{ paddingTop: 10 }}>
        <Card>
          <Grid container spacing={1}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={2} style={{ height: "80vh" }}>
                <Grid
                  container
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    position: "inherit",
                  }}
                >
                  <Grid item xs={12} sm={12} md={12} style={{ height: "25%" }}>
                    <SearchFriend />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} style={{ height: "75%" }}>
                    <ListFriendChat
                      listRooms={listRooms}
                      getActiveRoom={getActiveRoom}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                style={{
                  height: "100%",
                  borderLeft: "1px solid #e9e7e5",
                  borderRight: "1px solid #e9e7e5",
                }}
              >
                {activeRoom && <MessageChat activeRoom={activeRoom} />}
                {!activeRoom && (
                  <p className={classes.center}>Welcome To WeeAllo</p>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={2}
              >
                <ChatInfomation />
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
