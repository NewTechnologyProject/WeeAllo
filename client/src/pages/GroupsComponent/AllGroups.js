import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { Grid } from "@material-ui/core";
import groupAvatar from "src/access/GroupImage/group.png";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import classes from "./AllGroups.module.css";

const AllGroups = (props) => {
  const userId = localStorage.getItem("user_authenticated");
  const dispatch = useDispatch();
  const { listRooms } = props;
  const navigate = useNavigate();

  console.log(listRooms);

  const showNameHandler = (roomId) => {
    let name = "Group";

    if (listRooms.length > 0) {
      const neededRoom = listRooms.find((room) => room.id === roomId);
      if (neededRoom) {
        const members = neededRoom.userGroupList.filter(
          (member) => member.id !== Number(userId)
        );
        name = `${members[0].firstname}, ${members[1].firstname},...`;
      }
    }
    return name;
  };

  const moveToChat = (room) => {
    dispatch({
      type: "MOVE TO ACTIVE ROOM",
      payload: room,
    });
    navigate("/dashboard/chat", { replace: true });
  };

  const findGroupInList = (list) => {
    for (let room of list) {
      if (room.creator) {
        return true;
      }
    }
    return false;
  };

  return (
    <Grid
      container
      className={classes.container}
      gap={5}
      justifyContent="center"
      alignContent="center"
    >
      {listRooms &&
        listRooms.map((room) => {
          if (
            // room.userGroupList.length > 2 &&
            room.creator
          ) {
            const newRoom = {
              ...room,
              roomName: room.roomName
                ? room.roomName
                : showNameHandler(room.id),
            };
            return (
              <Grid item xs={6} sm={12} md={3} flex={1} key={newRoom.id}>
                <Card
                  className={classes.item}
                  onClick={moveToChat.bind(null, newRoom)}
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    image={newRoom.avatar ? newRoom.avatar : groupAvatar}
                    className={classes.img}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      textAlign="center"
                    >
                      {newRoom.roomName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      {`${newRoom.userGroupList.length} thành viên`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          }
        })}

      {!listRooms ||
        (!findGroupInList(listRooms) && (
          <div className={classes.empty}>Chưa có nhóm chat</div>
        ))}
    </Grid>
  );
};

export default AllGroups;
