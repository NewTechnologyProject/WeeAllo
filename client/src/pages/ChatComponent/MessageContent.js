import React, { useRef, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/styles";
import { MessageLeft, MessageRight } from "./CustomMessage";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: 10,
    },
  })
);

export default function App(props) {
  const classes = useStyles();
  const userId = localStorage.getItem("user_authenticated");

  const dateFormat = (time) => {
    const date = new Date(time);
    const dd = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    const mm =
      date.getMonth() > 8 ? date.getMonth() + 1 : "0" + date.getMonth() + 1;
    const yyyy = date.getFullYear();
    const hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
    const mins =
      date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();

    return dd + "/" + mm + "/" + yyyy + " " + hours + ":" + mins;
  };

  return (
    <div className={classes.container}>
      {props.listMessages.map((message, i) => {
        if (
          Number(userId) === message.userId.id &&
          Number(message.roomChatId.id) === props.activeRoom
        ) {
          return (
            <MessageRight
              key={i}
              message={message.content}
              timestamp={dateFormat(message.time)}
              video={message.video}
              img={message.image}
              file={message.file}
              displayName={`${message.userId.firstname} ${message.userId.lastname}`}
              avatarDisp={true}
            />
          );
        } else if (
          Number(userId) !== message.userId.id &&
          Number(message.roomChatId.id) === props.activeRoom
        ) {
          return (
            <MessageLeft
              key={i}
              message={message.content}
              timestamp={dateFormat(message.time)}
              video={message.video}
              file={message.file}
              img={message.image}
              photoURL={message.userId.avartar}
              displayName={`${message.userId.firstname} ${message.userId.lastname}`}
              avatarDisp={true}
            />
          );
        }
      })}
    </div>
  );
}
