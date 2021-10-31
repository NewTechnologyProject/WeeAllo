import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import { MessageLeft, MessageRight } from "./CustomMessage";
import { setDate } from "date-fns";

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
              timestamp={message.time}
              img={message.image}
              file={message.file}
              displayName={`${message.userId.firstname} ${message.userId.lastname}`}
              avatarDisp={true}
            />
          );
        } else if (
          Number(userId) !== message.userId.id &&
          Number(message.roomChatId.id) === props.activeRoom &&
          message.content
        ) {
          return (
            <MessageLeft
              key={i}
              message={message.content}
              timestamp={message.time}
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
