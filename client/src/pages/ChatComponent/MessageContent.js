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
      {props.listMessages.map((message) => {
        if (Number(userId) === message.userId.id && Number(message.roomChatId.id) === props.activeRoom) {
          return (
            <div>
              {message.image != null ? (
                <img src={message.image} alt="img" style={{ width: '30%', height: '30%', float: 'right' }} />
              ) : (
                <MessageRight
                  key={message.id}
                  message={message.content}
                  timestamp={message.time}
                  photoURL=""
                  displayName={`${message.userId.firstname} ${message.userId.lastname}`}
                  avatarDisp={true}
                />
              )}

            </div>
          );
        }
        else if (Number(userId) !== message.userId.id && Number(message.roomChatId.id) === props.activeRoom) {
          return (
            <div>

              {message.image != null ? (
                <img src={message.image} alt="img" style={{ width: '30%', height: '30%', float: 'left' }} />
              ) : (
                <MessageLeft
                  key={message.id}
                  message={message.content}
                  timestamp={message.time}
                  photoURL=""
                  displayName={`${message.userId.firstname} ${message.userId.lastname}`}
                  avatarDisp={false}
                />
              )}
            </div>
          );
        }
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
