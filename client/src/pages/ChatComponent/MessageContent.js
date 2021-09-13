import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import { MessageLeft, MessageRight } from "./CustomMessage";

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            padding: 10
        }
    })
);

export default function App() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <MessageLeft
                message="Chào mọi người"
                timestamp="MM/DD 00:00"
                photoURL=""
                displayName="Nam"
                avatarDisp={false}
            />
            <MessageLeft
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
            />
        </div>
    );
}
