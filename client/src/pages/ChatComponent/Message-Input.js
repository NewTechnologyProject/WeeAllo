import React, { PureComponent, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import InputBase from "@material-ui/core/InputBase";
import { useState } from "react";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "src/actions/create-new-message.action"
import { isToday } from 'date-fns';


/**
 *  New Message Input
 */
export const MessageInput = (props) => {
  const [message, setMessage] = useState(null);
  const [message1, setMessage1] = useState(null);
  const SET_USER_AUTHENTICATE = "user_authenticated";
  const userId = localStorage.getItem(SET_USER_AUTHENTICATE);
  //const user = useSelector(state => state.customer.userAuth);

  console.log(message);
  const user = useSelector((state) => state.customer.userAuth);


  useEffect(() => {
    if (props.dataEmoji) {
      setMessage(message + props.dataEmoji.emoji);
    }
  }, [props.dataEmoji]);

  const EmojiData = ({ chosenEmoji }) => (
    <div style={{ textAlign: 'center', marginRight: '810px' }}>
      {chosenEmoji.emoji}<br />
    </div>
  );

  const handleMessageKeyPressEvent = (event) => {
    if (event.key === 'Enter') {
      ///this.handleMessageSendEvent(event)
      //window.alert(message);
      const messageText = {

        status: "send",
        content: message,
        file: null,
        roomChatId: props.activeRoom,
        userId
      }
      console.log(messageText);
      dispatch(actions.addMessage(messageText))
      setMessage('')
    }
  }
  const dispatch = useDispatch();

  const sentMessage = () => {
    const messageText = {
      status: "send",
      content: message,
      file: null,
      roomChatId: props.activeRoom,
      userId,
    };
    dispatch(actions.addMessage(messageText));
    setMessage("");
  };

  return (
    <Fragment>
      <InputBase
        placeholder="Nhập tin nhắn của bạn"
        inputProps={{ "aria-label": "search google maps" }}
        fullWidth
        // value={message}
        autoFocus={true}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={(e) => handleMessageKeyPressEvent(e)}
        style={{ paddingLeft: 10, width: 1120, paddingRight: 50 }}
      />
      {/* <Divider orientation="vertical" /> */}
      {/* <IconButton
        color="primary"
        aria-label="directions"
        style={{ float: "right" }}
      >
        <SendIcon onClick={sentMessage} />
      </IconButton> */}
    </Fragment>
  );
}