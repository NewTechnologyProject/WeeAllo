import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Grid } from "@material-ui/core";
import { width } from "@material-ui/system";

const useStyles = makeStyles((theme) =>
  createStyles({
    messageFile: {
      display: "flex",
      width: "100%",
      height: "100%",
      backgroundColor: "red",
    },
    messageRow: {
      display: "flex",
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end",
    },
    messageBlue: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "white",
      width: "90%",
      wordWrap: "break-word",
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
        left: "-15px",
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
        left: "-17px",
      },
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
      wordWrap: "break-word",
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
        right: "-15px",
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
        right: "-17px",
      },
    },

    messageContent: {
      padding: 10,
      margin: 0,
      width: 300,
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".85em",
      fontWeight: "300",
      marginTop: "50px",
      bottom: "-3px",
      right: "5px",
      paddingBottom: 10,
    },

    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    displayName: {
      marginLeft: "20px",
    },
    displayFile: {
      padding: 25,
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: "black",
      textDecoration: "none",
      fontWeight: "bold",
    },
  })
);

const getFileExt = (str) => {
  const fileExt1 = str.split(
    "https://image-upload-weeallo.s3.us-east-2.amazonaws.com/"
  )[1];
  const fileName = String(fileExt1);
  let fileExt = fileName.split(/-(.+)/)[1];
  return fileExt;
};

const getFileType = (str) => {
  let re = /(?:\.([^.]+))?$/;
  return re.exec(str)[1];
};

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "";
  const displayName = props.displayName ? props.displayName : "";
  const img = props.img ? props.img : "";
  const video = props.video ? props.video : "";
  const filePath = props.file ? props.file : "";

  let ext = getFileType(filePath);
  let fileExt = getFileExt(filePath);
  let video_ext = getFileType(video);
  let video_fileExt = getFileExt(video);
  const classes = useStyles();

  return (
    <>
      <div className={classes.messageRow}>
        <Avatar src={photoURL}></Avatar>
        <div>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageBlue}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
            <div style={{ width: 300 }}>
              <img src={img} style={{ width: "95%", paddingBottom: 20 }} />
              {video && video_ext === "mp4" && (
                <video
                  width="95%"
                  height="100%"
                  style={{ paddingBottom: 20 }}
                  controls
                >
                  <source src={video} />
                </video>
              )}
            </div>

            {filePath ? (
              <Grid container style={{ width: 300, paddingBottom: 10 }}>
                <Grid item xs={2}>
                  <a target="_blank" href={filePath} download={fileExt}>
                    <FileIcon extension={ext} {...defaultStyles[ext]} />
                  </a>
                </Grid>
                <Grid item xs={10}>
                  <a
                    target="_blank"
                    href={filePath}
                    className={classes.displayFile}
                  >
                    {`${fileExt}`}
                  </a>
                </Grid>
              </Grid>
            ) : (
              <div></div>
            )}

            {video && video_ext !== "mp4" ? (
              <Grid container style={{ width: 300, paddingBottom: 10 }}>
                <Grid item xs={2}>
                  <a target="_blank" href={video} download={video_fileExt}>
                    <FileIcon
                      extension={video_ext}
                      {...defaultStyles[video_ext]}
                    />
                  </a>
                </Grid>
                <Grid item xs={10}>
                  <a
                    target="_blank"
                    href={video}
                    className={classes.displayFile}
                  >
                    {`${video_fileExt}`}
                  </a>
                </Grid>
              </Grid>
            ) : (
              <div></div>
            )}
            <div className={classes.messageTimeStampRight}>{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export const MessageRight = (props) => {
  const classes = useStyles();
  const message = props.message ? props.message : "";
  const timestamp = props.timestamp ? props.timestamp : "";
  const img = props.img ? props.img : "";
  const video = props.video ? props.video : "";
  const filePath = props.file ? props.file : "";

  let ext = getFileType(filePath);
  let fileExt = getFileExt(filePath);
  let video_ext = getFileType(video);
  let video_fileExt = getFileExt(video);

  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <p className={classes.messageContent}>{message}</p>
        <div style={{ marginBottom: 10 }}>
          <img style={{ paddingBottom: 20 }} src={img} />
          {video && video && video_ext === "mp4" && (
            <video
              src={video}
              width="100%"
              height="100%"
              style={{ paddingBottom: 20 }}
              controls
            ></video>
          )}
        </div>
        {filePath ? (
          <Grid container style={{ width: 300, paddingBottom: 10 }}>
            <Grid item xs={2}>
              <a target="_blank" href={filePath} download={fileExt}>
                <FileIcon extension={ext} {...defaultStyles[ext]} />
              </a>
            </Grid>
            <Grid item xs={10}>
              <a
                target="_blank"
                href={filePath}
                className={classes.displayFile}
                style={{ paddingRight: 45 }}
              >
                {`${fileExt}`}
              </a>
            </Grid>
          </Grid>
        ) : (
          <div></div>
        )}

        {video && video_ext !== "mp4" ? (
          <Grid container style={{ width: 300, paddingBottom: 10 }}>
            <Grid item xs={2}>
              <a target="_blank" href={video} download={video_fileExt}>
                <FileIcon
                  extension={video_ext}
                  {...defaultStyles[video_fileExt]}
                />
              </a>
            </Grid>
            <Grid item xs={10}>
              <a
                target="_blank"
                href={video}
                className={classes.displayFile}
                style={{ paddingRight: 45 }}
              >
                {`${video_fileExt}`}
              </a>
            </Grid>
          </Grid>
        ) : (
          <div></div>
        )}
        <div className={classes.messageTimeStampRight}>{timestamp}</div>
      </div>
    </div>
  );
};
