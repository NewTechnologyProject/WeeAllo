import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback, Fragment, useRef } from "react";

// material
import { Grid, Container } from "@material-ui/core";
// components
import Page from "src/components/Page";
import MessageChat from "./Message";
import SearchFriend from "./Search";
import ListFriendChat from "./ListFriendChat";
import { Card } from "@material-ui/core";
import * as actions from "src/actions/customer.action";
import classes from "./Chat.module.css";
import ChatInfomation from "./ChatInformation/ChatInfomation";
import Spinner from "./ui/Spinner";
import { io } from "socket.io-client";
import { SOCKET_URL } from "src/services/api.service";

const URL = SOCKET_URL;

export default function Chat() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [needLoad, setNeedLoad] = useState({ data: "new" });
  const [keyword, setKeyword] = useState("");
  const [updatedRoom, setUpdatedRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [receivedDeletedRoom, setReceivedDeletedRoom] = useState(null);
  const [receivedRemovedMemberRoom, setReceivedRemovedMemberRoom] =
    useState(null);
  const [receivedUpdatedRoom, setReceivedUpdatedRoom] = useState(null);
  const [receivedOutMember, setReceivedOutMember] = useState(null);
  const socket = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listRooms = useSelector((state) => state.customer.listRooms);
  const moveToActiveRoom = useSelector(
    (state) => state.roomchat.moveToActiveRoom
  );
  const userId = localStorage.getItem("user_authenticated");

  const loadRoomsHandler = useCallback(() => {
    dispatch(actions.fetchAllRoom(userId));
  }, [userId, actions.fetchAllRoom]);

  const needLoadHandler = (data) => {
    setNeedLoad(data);
  };

  const setActiveRoomNullHandler = () => {
    setActiveRoom(null);
  };

  const getKeyword = (key) => {
    setKeyword(key);
  };

  const getFilteredRooms = (rooms, key) => {
    if (key === "") {
      return rooms;
    }
    return rooms.filter((room) => {
      if (room.roomName) {
        return room.roomName.toLowerCase().includes(key.toLowerCase());
      }
    });
  };

  // ----------------------------------------------------------------------
  //Real time
  useEffect(() => {
    socket.current = io(URL);

    socket.current.on("getNewRoom", (data) => {
      let user = data.find((member) => member.id === Number(userId));
      if (user) {
        loadRoomsHandler();
      }
    });

    socket.current.on("getNewMembers", (data) => {
      const { roomId, members } = data;
      let user = members.find((member) => member.id === Number(userId));
      if (user) {
        loadRoomsHandler();
      }
    });

    socket.current.on("getMemberOutRoom", (data) => {
      if (data.newCreator) {
        loadRoomsHandler();
      }
      setReceivedOutMember(data);
    });
  }, []);

  useEffect(() => {
    socket.current.on("getDeletedRoom", (data) => {
      const { roomId, members } = data;
      let user = members.find((member) => member.id === Number(userId));
      if (user) {
        loadRoomsHandler();
        setReceivedDeletedRoom(roomId);
      }
    });

    socket.current.on("getRemovedMember", (data) => {
      const { roomId, memberId } = data;
      let user = memberId === Number(userId);
      if (user) {
        loadRoomsHandler();
        setReceivedRemovedMemberRoom(roomId);
      }
    });

    socket.current.on("getUpdatedRoom", (data) => {
      const { room, members } = data;
      let user = members.find((member) => member.id === Number(userId));
      if (user) {
        loadRoomsHandler();
        setReceivedUpdatedRoom(room);
      }
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", Number(userId));
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [userId]);
  // ----------------------------------------------------------------------

  useEffect(() => {
    if (activeRoom) {
      if (receivedDeletedRoom === activeRoom.id) {
        setActiveRoom(null);
      }
    }
  }, [receivedDeletedRoom]);

  useEffect(() => {
    if (activeRoom) {
      if (receivedRemovedMemberRoom === activeRoom.id) {
        setActiveRoom(null);
      }
    }
  }, [receivedRemovedMemberRoom]);

  useEffect(() => {
    let unmount = true;

    if (activeRoom) {
      if (receivedUpdatedRoom.id === activeRoom.id && unmount) {
        setActiveRoom((prevState) => {
          return {
            ...prevState,
            roomName: receivedUpdatedRoom.roomName,
            avatar: receivedUpdatedRoom.avatar,
          };
        });
      }
    }

    return () => {
      unmount = false;
    };
  }, [receivedUpdatedRoom]);

  useEffect(() => {
    let unmount = true;

    if (receivedOutMember && activeRoom) {
      if (
        receivedOutMember.roomId === activeRoom.id &&
        unmount &&
        receivedOutMember.newCreator
      ) {
        setActiveRoom((prevState) => {
          return {
            ...prevState,
            creator: receivedOutMember.newCreator,
          };
        });
      }
    }

    return () => {
      unmount = false;
    };
  }, [receivedOutMember]);

  useEffect(() => {
    if (!activeRoom) {
      setActiveRoom(moveToActiveRoom);
    }

    if (needLoad) {
      loadRoomsHandler();
    }

    if (userId === "undefined") {
      navigate("/login", { replace: true });
    }
  }, [loadRoomsHandler, needLoad]);

  const getActiveRoom = (room, name) => {
    let newRoom = room;
    if (!room.roomName) {
      newRoom = { ...room, roomName: name };
    }
    setActiveRoom(newRoom);
    dispatch({ type: "ACTIVE ROOM", payload: newRoom });
  };

  useEffect(() => {
    loadRoomsHandler();
  }, [updatedRoom]);

  const getUpdatedRoom = (newRoom) => {
    setUpdatedRoom(newRoom);
  };

  const getLoading = (value) => {
    setLoading(value);
  };

  return (
    <Page title="Chat | WeeAllo">
      <Container maxWidth="100%" style={{ paddingTop: 10 }}>
        <Card>
          <Grid container spacing={1}>
            <Grid
              container
              spacing={0}
              style={{ height: "80vh", position: "relative" }}
            >
              <Grid item xs={12} sm={12} md={2} style={{ height: "100%" }}>
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
                    <SearchFriend
                      onNeedLoad={needLoadHandler}
                      getKeyword={getKeyword}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} style={{ height: "75%" }}>
                    <ListFriendChat
                      listRooms={getFilteredRooms(listRooms, keyword)}
                      getActiveRoom={getActiveRoom}
                      activeRoom={activeRoom}
                      updatedRoom={updatedRoom}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* When activeRoom has values */}
              {activeRoom && (
                <Fragment>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    style={{
                      height: "80vh",
                      borderLeft: "1px solid #e9e7e5",
                      borderRight: "1px solid #e9e7e5",
                      position: "relative",
                    }}
                  >
                    <MessageChat
                      activeRoom={activeRoom}
                      getLoading={getLoading}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={2} style={{ height: "100%" }}>
                    <ChatInfomation
                      activeRoom={activeRoom}
                      onNeedLoad={needLoadHandler}
                      onSetActiveRoomNull={setActiveRoomNullHandler}
                      getUpdatedRoom={getUpdatedRoom}
                      getLoading={getLoading}
                    />
                  </Grid>
                </Fragment>
              )}

              {/* When activeRoom is undefined */}
              {!activeRoom && (
                <Grid item xs={12} sm={12} md={10} style={{ height: "100%" }}>
                  <div className={classes.contain}>
                    <p className={classes.title}>
                      Chào Mừng Đến Với <strong> WEEALLO </strong>
                    </p>
                    <p className={classes.subtitle}>
                      Khám phá những tiện ích hỗ trợ làm việc, trò chuyện
                      <br /> cùng người thân và bạn bè
                    </p>

                    <img src="/logo.png" className={classes.logo} />
                  </div>
                </Grid>
              )}

              {loading && <Spinner />}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
