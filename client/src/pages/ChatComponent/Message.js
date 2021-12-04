import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";

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
import ChildCareIcon from "@material-ui/icons/ChildCare";
import ImageIcon from "@material-ui/icons/Image";
import { MessageInput } from "./Message-Input";
import classes from "./Message.module.css";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import Scrollbar from "src/components/Scrollbar";
import axios from "axios";
import { io } from "socket.io-client";
import FileAlert from "./send-file-alert/FileAlert";

// ----------------------------------------------------------------------

const URL = "ws://localhost:3030";

export default function MessageChat(props) {
  const dispatch = useDispatch();
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const newMessage = useSelector((state) => state.message.message);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [listMembers, setListMembers] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emojiStatus, setEmojiStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [img, setImg] = useState();
  const [video, setVideo] = useState();
  const [sFile, setSFile] = useState();
  const [open, setOpen] = useState(false);
  const socket = useRef();
  const file = useRef(null);
  const image = useRef(null);
  const userId = localStorage.getItem("user_authenticated");
  //RealTime
  const [messages, setMessage] = useState([]);
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

  const getType = (str) => {
    const str1 = str.split(".")[5];
    return str1;
  };

  const isVideo = (type) => {
    switch (type.toLowerCase()) {
      case "mp4":
      case "mov":
      case "wmv":
      case "avchd":
      case "flv":
      case "f4v":
      case "swf":
      case "mkv":
      case "webm":
      case "html5":
      case "mpeg-2":
        return true;
      default:
        return false;
    }
  };

  const handleImage = (e) => {
    const imageA = e.target.files[0];
    const formData = new FormData();
    formData.append("file", imageA);
    axios
      .post("http://localhost:4000/api/storage/uploadFile?key=file", formData)
      .then((response) => {
        const typeOfFile = getType(response.data);
        if (isVideo(typeOfFile)) {
          setVideo(response.data);
        } else {
          setImg(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (imageA) {
          setOpen(true);
        }
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
      })
      .catch((error) => {
        console.log(error);
        if (imageA) {
          setOpen(true);
        }
      });
  };

  useEffect(() => {
    dispatch(actions.fetchAllMessages(props.activeRoom.id));
    actions
      .fetchAllMembers(props.activeRoom.id)
      .then((res) => setListMembers(res.data))
      .catch((error) => console.log(error));
  }, [props.activeRoom]);

  useEffect(() => {
    if (listMessages) {
      setMessage(listMessages);
    }
  }, [listMessages]);

  // ----------------------------------------------------------------------
  //Real time
  useEffect(() => {
    socket.current = io(URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage(data.message);
    });
  }, []);

  useEffect(() => {
    if (
      arrivalMessage &&
      arrivalMessage.roomChatId.id === props.activeRoom.id
    ) {
      addMessage(arrivalMessage);

      dispatch({
        type: "ADDMESSAGE",
        payload: arrivalMessage,
      });
    }
  }, [arrivalMessage, props.activeRoom]);

  useEffect(() => {
    socket.current.emit("addUser", Number(userId));
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [userId]);
  // ----------------------------------------------------------------------

  const addMessage = (message) => {
    setMessage((prevArray) => [...prevArray, message]);
  };

  const submitMessage = (messageString) => {
    // ----------------------------------------------------------------------
    //Real time
    let receiverId = [];
    for (let member of listMembers) {
      if (member.id !== Number(userId))
        receiverId = [...receiverId, { userId: member.id }];
    }
    socket.current.emit("sendMessage", {
      senderId: Number(userId),
      receiverId,
      message: messageString,
    });
    // ----------------------------------------------------------------------

    addMessage(messageString);
    setImg();
    setVideo();
    setSFile();
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: "100%" }}>
      <FileAlert open={open} onClose={onClose} />
      <Grid container spacing={0} style={{ height: "100%" }}>
        <Grid
          container
          spacing={0}
          style={{ height: "100%", position: "relative" }}
        >
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

          <Grid
            style={{
              marginTop: 300,
              position: "absolute",
              left: 10,
              bottom: 100,
            }}
          >
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
                  video={video}
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
