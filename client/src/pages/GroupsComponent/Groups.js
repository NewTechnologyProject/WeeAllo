import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Tab, Box } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Container, Stack, Typography } from "@material-ui/core";
import Page from "src/components/Page";
import AllGroups from "./AllGroups";
import GroupsByMe from "./GroupsByMe";
import { fetchAllMembers } from "src/actions/roomchat.action";
import * as actions from "src/actions/customer.action";
import classes from "./Groups.module.css";

const Groups = () => {
  const [value, setValue] = useState("1");
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.customer.listRooms);
  const [listRooms, setListRooms] = useState([]);
  const userId = localStorage.getItem("user_authenticated");

  const loadRoomsHandler = useCallback(() => {
    dispatch(actions.fetchAllRoom(userId));
  }, [userId, actions.fetchAllRoom]);

  const setListMembersOnRoom = useCallback(
    (rooms) => {
      setListRooms([]);
      if (rooms.length > 0) {
        rooms.map(async (room) => {
          let members = [];

          const res = await fetchAllMembers(room.id);
          const data = res.data;

          members = data;

          const newRoom = { ...room, userGroupList: members };
          setListRooms((prevState) => {
            return [...prevState, newRoom];
          });
        });
      }
    },
    [fetchAllMembers]
  );

  useEffect(() => {
    if (rooms.length === 0) {
      loadRoomsHandler();
    }
  }, [loadRoomsHandler, rooms]);

  useEffect(() => {
    setListMembersOnRoom(rooms);
  }, [setListMembersOnRoom, rooms]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Nhóm Chat | WeeAllo">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Danh sách nhóm
        </Typography>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tất cả" value="1" />
                <Tab label="Nhóm tôi quản lý" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <AllGroups listRooms={listRooms} />
            </TabPanel>
            <TabPanel value="2">
              <GroupsByMe listRooms={listRooms} />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Page>
  );
};

export default Groups;