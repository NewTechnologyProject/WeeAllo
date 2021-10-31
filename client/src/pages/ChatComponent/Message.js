import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import * as actions from "src/actions/roomchat.action";
import { Avatar } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MessageContent from "./MessageContent";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import ImageIcon from "@material-ui/icons/Image";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { MessageInput } from "./Message-Input";
import InputBase from "@material-ui/core/InputBase";
import classes from "./Message.module.css";
//import MessageInput from "./Message-Input";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import Scrollbar from "src/components/Scrollbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

// import Menu from "@material-ui/core/Menu";

// const SORT_OPTIONS = [
//   { value: "latest", label: "Latest" },
//   { value: "popular", label: "Popular" },
//   { value: "oldest", label: "Oldest" },
// ];

// ----------------------------------------------------------------------

const URL = "ws://localhost:3030";
export default function MessageChat(props) {
  const dispatch = useDispatch();
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emojiStatus, setEmojiStatus] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const file = useRef(null);
  const image = useRef(null);
  const [img, setImg] = useState();
  const [sFile, setSFile] = useState();

  //RealTime
  const [name, setName] = useState("Ichlas");
  const [messages, setMessage] = useState([]);
  const [ws, setWs] = useState(new WebSocket(URL));
  //Scroll
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);
  const iconClick = () => {
    setEmojiStatus(!emojiStatus);
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const chooseFile = () => {
    file.current.click();
  };

  const chooseImage = () => {
    image.current.click();
  };

  const handleImage = (e) => {
    const imageA = e.target.files[0];
    const formData = new FormData();
    formData.append("file", imageA);
    axios
      .post("http://localhost:4000/api/storage/uploadFile?key=file", formData)
      .then((response) => {
        setImg(response.data);
      });
  };

  const handleFile = (e) => {
    const imageA = e.target.files[0];
    const formData = new FormData();
    formData.append("file", imageA);
    axios
      .post("http://localhost:4000/api/storage/uploadFile?key=file", formData)
      .then((response) => {
        setSFile(response.data);
      });
  };

  useEffect(() => {
    if (props.activeRoom) {
      dispatch(actions.fetchAllMessages(props.activeRoom.id));
    }
  }, [props.activeRoom]);

  useEffect(() => {
    if (listMessages) {
      setMessage(listMessages);
    }
  }, [listMessages]);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  //Real time
  useEffect(() => {
    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      addMessage(message);
    };

    ws.onclose = () => {
      console.log("disconnected");
      setWs(new WebSocket(URL));
    };
  }, [ws]);

  const addMessage = (message) => {
    setMessage((prevArray) => [...prevArray, message]);
  };

  const submitMessage = (messageString) => {
    ws.send(JSON.stringify(messageString));
    addMessage(messageString);
    setImg();
    setSFile();
  };

  console.log(messages);

  return (
    <div style={{ height: "100%" }}>
      <Grid container spacing={0} style={{ height: "100%" }}>
        <Grid container spacing={0} style={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{
              height: "10%",
              borderBottom: "1px solid #e9e7e5",
            }}
          >
            <ListItem style={{ height: "100%" }}>
              <ListItemAvatar>
                <Avatar
                  alt={props.activeRoom.roomName}
                  src={
                    props.activeRoom.avatar
                      ? props.activeRoom.avatar
                      : "dummy.js"
                  }
                ></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={props.activeRoom.roomName}
                secondary={props.activeRoom.createAt}
              />
            </ListItem>
          </Grid>

          {/* Message Area */}
          <Grid item xs={12} sm={12} md={12} style={{ height: "75%" }}>
            {listMessages.length > 0 ? (
              <Scrollbar
                sx={{
                  height: "100%",
                }}
              >
                <MessageContent
                  listMessages={messages}
                  activeRoom={props.activeRoom.id}
                />
                <div ref={messagesEndRef} />
              </Scrollbar>
            ) : (
              <div className={classes.contain}>
                <p>"Let's say something"</p>
              </div>
            )}
          </Grid>

          <Grid style={{ marginTop: 300, position: "absolute" }}>
            {emojiStatus === true ? (
              <Picker
                onEmojiClick={onEmojiClick}
                skinTone={SKIN_TONE_MEDIUM_DARK}
              />
            ) : (
              <span></span>
            )}
          </Grid>

          {/* Typing message */}
          <Grid item xs={12} sm={12} md={12} style={{ height: "15%" }}>
            <Grid container style={{ height: "100%" }}>
              <Grid
                item
                xs={12}
                style={{
                  height: "40%",
                  display: "flex",
                  borderBottom: "1px solid #e9e7e5",
                }}
              >
                {/* Emoji */}
                <IconButton
                  type="submit"
                  aria-label="search"
                  style={{ width: 50 }}
                  onClick={iconClick}
                >
                  <ChildCareIcon />
                </IconButton>

                {/* Image */}
                <Divider orientation="vertical" />
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif"
                  multiple
                  hidden
                  ref={image}
                  onChange={handleImage}
                />
                <IconButton
                  aria-label="directions"
                  style={{ width: 50 }}
                  onClick={chooseImage}
                >
                  <ImageIcon />
                </IconButton>

                {/* File */}
                <Divider orientation="vertical" />
                <input type="file" hidden ref={file} onChange={handleFile} />
                <IconButton
                  aria-label="directions"
                  style={{ width: 50 }}
                  onClick={chooseFile}
                >
                  <AttachFileIcon />
                </IconButton>
              </Grid>

              {/* Message input */}
              <Grid
                item
                xs={12}
                style={{ height: "60%" }}
                style={{ paddingLeft: 10, paddingRight: 10, display: "flex" }}
              >
                <MessageInput
                  dataEmoji={chosenEmoji}
                  image={img}
                  file={sFile}
                  activeRoom={props.activeRoom.id}
                  onSubmitMessage={(messageString) =>
                    submitMessage(messageString)
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
