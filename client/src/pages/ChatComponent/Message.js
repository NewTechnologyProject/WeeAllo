import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PropTypes from 'prop-types'

import * as actions from "src/actions/roomchat.action";
import { Avatar } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MessageContent from "./MessageContent";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import SendIcon from "@material-ui/icons/Send";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import ImageIcon from "@material-ui/icons/Image";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import Menu from "@material-ui/core/Menu";
import { MessageInput } from "./Message-Input";
//import MessageInput from "./Message-Input";

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------

export default function MessageChat(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const [chosenEmoji, setChosenEmoji] = React.useState(null);
  const [emojiStatus, setEmojiStatus] = React.useState(false);

  const iconClick = () => {
    setEmojiStatus(!emojiStatus);
  }

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  }

  // const EmojiData = ({ chosenEmoji }) => (
  //   <div style={{ textAlign: 'center', marginRight: '810px' }}>
  //     {chosenEmoji.emoji}<br />
  //   </div>
  // );

  MessageChat.propTypes = {
    props: PropTypes.bool.isRequired,
  }

  useEffect(() => {
    dispatch(actions.fetchAllMessages(props.activeRoom.id));
  }, [props.activeRoom]);

  // console.log(listMessages);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ height: "100%" }}>
      <Grid container spacing={0} style={{ height: "100%" }}>
        <Grid container spacing={0} style={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ height: "10%", borderBottom: "1px solid #e9e7e5" }}
          >
            <ListItem style={{ height: "100%" }}>
              <ListItemAvatar>
                <Avatar>N</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={props.activeRoom.roomName}
                secondary={props.activeRoom.createAt}
              />
            </ListItem>
          </Grid>

          {/* Message Area */}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
          >
            {listMessages.length > 0 ? (
              <MessageContent listMessages={listMessages} />
            ) : (
              <p>Let's say something</p>
            )}
          </Grid>

          <Grid
            style={{ height: "60%", paddingTop: 100}}>
            {emojiStatus === true ? (
              <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK} />

            ) : (<span></span>)}
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

                <IconButton
                  type="submit"
                  aria-label="search"
                  style={{ width: 50 }}
                >
                  <ChildCareIcon onClick={iconClick} />
                </IconButton>


                <Divider orientation="vertical" />
                <IconButton aria-label="directions" style={{ width: 50 }}>
                  <ImageIcon />
                </IconButton>

                <Divider orientation="vertical" />
                <IconButton aria-label="directions" style={{ width: 50 }}>
                  <AttachFileIcon />
                </IconButton>

                <Divider orientation="vertical" />
                <IconButton aria-label="directions" style={{ width: 50 }}>
                  <AssignmentTurnedInIcon />
                </IconButton>
              </Grid>
              <Grid
                style={{ height: 60}}
                // style={{ paddingLeft: 10, paddingRight: 10, display: "flex" }}
              >
                <MessageInput dataEmoji={chosenEmoji} activeRoom = {props.activeRoom.id} />

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

}

