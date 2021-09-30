import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
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

  return (
    <div className={classes.container}>
      {props.listMessages.map((message) => {
        if (Number(userId) === message.userId.id) {
          return (
            <MessageRight
              key={message.id}
              message={message.content}
              timestamp="MM/DD 00:00"
              photoURL="Chao cc"
              displayName={`${message.userId.firstname} ${message.userId.lastname}`}
              avatarDisp={true}
            />
          );
        }

        return (
          <MessageLeft
            key={message.id}
            message={message.content}
            timestamp="MM/DD 00:00"
            photoURL=""
            displayName={`${message.userId.firstname} ${message.userId.lastname}`}
            avatarDisp={false}
          />
        );
      })}

      {/* <MessageLeft
                message="Chào cc"
                timestamp="MM/DD 00:00"
                photoURL=""
                displayName="Hoài"
                avatarDisp={false}
            />
            <MessageRight
                message="Chào cc"
                timestamp="MM/DD 00:00"
                photoURL="Chào cc"
                displayName="Huy"
                avatarDisp={true}
            /> */}
    </div>
  );
}
