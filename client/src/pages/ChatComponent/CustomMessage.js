import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { FileIcon, defaultStyles } from 'react-file-icon';
import { Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) =>
    createStyles({
        messageRow: {
            display: "flex"
        },
        messageRowRight: {
            display: "flex",
            justifyContent: "flex-end"
        },
        messageBlue: {
            position: "relative",
            marginLeft: "20px",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "white",
            width: "90%",
            wordWrap: 'break-word',
            //height: "50px",
            textAlign: "left",
            font: "400 .9em 'Open Sans', sans-serif",
            border: "1px solid #97C6E3",
            borderRadius: "10px",

            "&:after": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid white",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                left: "-15px"
            },
            "&:before": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid #97C6E3",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                left: "-17px"
            }
        },
        messageOrange: {
            position: "relative",
            marginRight: "20px",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "white",
            width: "30%",
            //height: "50px",
            textAlign: "left",
            wordWrap: 'break-word',
            font: "400 .9em 'Open Sans', sans-serif",
            border: "1px solid #dfd087",
            borderRadius: "10px",
            "&:after": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid white",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                right: "-15px"
            },
            "&:before": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid #dfd087",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                right: "-17px"
            }
        },

        messageContent: {
            padding: 10,
            margin: 0,
            width: 300
        },
        messageTimeStampRight: {
            position: "absolute",
            fontSize: ".85em",
            fontWeight: "300",
            marginTop: "10px",
            bottom: "-3px",
            right: "5px",
            paddingBottom: 10
        },

        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
            width: theme.spacing(4),
            height: theme.spacing(4)
        },
        avatarNothing: {
            color: "transparent",
            backgroundColor: "transparent",
            width: theme.spacing(4),
            height: theme.spacing(4)
        },
        displayName: {
            marginLeft: "20px"
        },
        displayFile: {
            padding: 30,
            display: 'block',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: '15vw',
            color: 'black',
            textDecoration: 'none',
            fontWeight: 'bold'
        }
    })
);

export const MessageLeft = (props) => {
    var re = /(?:\.([^.]+))?$/;
    const message = props.message ? props.message : "";
    const timestamp = props.timestamp ? props.timestamp : "";
    const photoURL = props.photoURL ? props.photoURL : "";
    const displayName = props.displayName ? props.displayName : "";
    const img = props.img ? props.img : "";
    const filePath = props.file ? props.file : "";
    var ext = re.exec(filePath)[1];
    const fileExt1 = filePath.split("https://file-upload-weeallo-02937.s3.ap-southeast-1.amazonaws.com/")[1];
    const fileName = String(fileExt1)
    var fileExt = fileName.split(/-(.+)/)[1];
    const classes = useStyles();
    return (
        <>
            <div className={classes.messageRow}>
                <Avatar
                    // alt={displayName}
                    // className={classes.orange}
                    src={photoURL}
                ></Avatar>
                <div>
                    <div className={classes.displayName}>{displayName}</div>
                    <div className={classes.messageBlue}>
                        <div>
                            <p className={classes.messageContent}>{message}</p>
                        </div>
                        <div style={{ width: 300 }}>
                            <img src={img} style={{ width: '95%' }} /> <br></br>
                        </div>
                        {
                            filePath ? (
                                <Grid container style={{ width: 300 }}>
                                    <Grid item xs={2}>
                                        <a target="_blank" href={filePath} download={fileExt}><FileIcon extension={ext} {...defaultStyles[ext]} /></a>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <a target="_blank" href={filePath} className={classes.displayFile}>{fileExt}</a>
                                    </Grid>
                                </Grid>
                            ) : <div></div>
                        }
                        <div className={classes.messageTimeStampRight}>{timestamp}</div>
                    </div>
                </div>
            </div>
        </>
    );
};
export const MessageRight = (props) => {
    var re = /(?:\.([^.]+))?$/;
    const classes = useStyles();
    const message = props.message ? props.message : "";
    const timestamp = props.timestamp ? props.timestamp : "";
    const img = props.img ? props.img : "";
    const filePath = props.file ? props.file : "";
    var ext = re.exec(filePath)[1];
    const fileExt1 = filePath.split("https://file-upload-weeallo-02937.s3.ap-southeast-1.amazonaws.com/")[1];
    const fileName = String(fileExt1)
    var fileExt = fileName.split(/-(.+)/)[1];
    return (
        <div className={classes.messageRowRight}>
            <div className={classes.messageOrange}>
                <p className={classes.messageContent}>{message}</p>
                <div>
                    <img src={img} /><br></br>
                </div>
                {
                    filePath ? (
                        <Grid container style={{ width: 300 }}>
                            <Grid item xs={2}>
                                <a target="_blank" href={filePath} download={fileExt}><FileIcon extension={ext} {...defaultStyles[ext]} /></a>
                            </Grid>
                            <Grid item xs={10}>
                                <a target="_blank" href={filePath} className={classes.displayFile}>{fileExt}</a>
                            </Grid>
                        </Grid>
                    ) : <div></div>
                }
                <div className={classes.messageTimeStampRight}>{timestamp}</div>
            </div>
        </div>
    );
};
