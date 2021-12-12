import React, { PureComponent, useEffect, Fragment, useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "src/actions/create-new-message.action";
import * as actionuser from "src/actions/customer.action";
import apiService from "../../services/api.service";

/**
 *  New Message Input
 */
export const MessageInput = (props) => {
  const [message, setMessage] = useState("");
  const SET_USER_AUTHENTICATE = "user_authenticated";
  const userId = localStorage.getItem(SET_USER_AUTHENTICATE);
  const user = useSelector((state) => state.customer.userAuth);
  const today = new Date();
  const time = null;
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.customer.userById);
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    dispatch(actionuser.findByIdUser(user));
  }, []);

  useEffect(() => {
    if (profile !== undefined) {
      setUserProfile(profile);
    }
  }, [profile]);

  const EmojiData = ({ chosenEmoji }) => (
    <div style={{ textAlign: "center", marginRight: "810px" }}>
      {chosenEmoji.emoji}
      <br />
    </div>
  );

  useEffect(() => {
    if (props.dataEmoji) {
      setMessage(message + props.dataEmoji.emoji);
    }
  }, [props.dataEmoji]);

  useEffect(() => {
    if (props.video) {
      sentMessage();
    }
  }, [props.video]);

  useEffect(() => {
    if (props.image) {
      sentMessage();
    }
  }, [props.image]);

  useEffect(() => {
    if (props.file) {
      sentMessage();
    }
  }, [props.file]);

  const handleMessageKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      const messageText = {
        status: "send",
        content: message,
        video: props.video,
        image: props.image,
        file: props.file,
        roomChatId: {
          id: props.activeRoom,
        },
        time: today,
        userId: {
          id: Number(user),
          firstname: userProfile.firstname,
          lastname: userProfile.lastname,
          avartar: userProfile.avartar,
        },
      };

      apiService
        .message()
        .addMessage(messageText)
        .then((response) => {
          dispatch({
            type: "ADDMESSAGE",
            payload: response.data,
          });

          props.onSubmitMessage(response.data);

          // console.log(response.data);
        })
        .catch((err) => console.log(err));
      setMessage("");
    }
  };

  const sentMessage = () => {
    const messageText = {
      status: "send",
      content: message,
      video: props.video,
      image: props.image,
      file: props.file,
      roomChatId: {
        id: props.activeRoom,
      },
      time: today,
      userId: {
        id: Number(user),
        firstname: userProfile.firstname,
        lastname: userProfile.lastname,
        avartar: userProfile.avartar,
      },
    };

    apiService
      .message()
      .addMessage(messageText)
      .then((response) => {
        dispatch({
          type: "ADDMESSAGE",
          payload: response.data,
        });
        props.onSubmitMessage(response.data);
      })
      .catch((err) => console.log(err));
    setMessage("");
  };

  return (
    <Fragment>
      <InputBase
        placeholder="Nhập tin nhắn của bạn"
        inputProps={{ "aria-label": "search google maps" }}
        fullWidth
        value={message}
        autoFocus={true}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={(e) => handleMessageKeyPressEvent(e)}
        style={{ paddingLeft: 10, width: 1100, paddingRight: 50 }}
      />
      <Divider orientation="vertical" style={{ paddingRight: 10 }} />
      <IconButton
        color="primary"
        aria-label="directions"
        style={{ float: "right" }}
        onClick={sentMessage}
      >
        <SendIcon />
      </IconButton>
    </Fragment>
  );
};
