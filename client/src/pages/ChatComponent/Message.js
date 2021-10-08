import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
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
// import InputBase from "@material-ui/core/InputBase";
//import MessageInput from "./Message-Input";
// import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
// import Menu from "@material-ui/core/Menu";

// const SORT_OPTIONS = [
//   { value: "latest", label: "Latest" },
//   { value: "popular", label: "Popular" },
//   { value: "oldest", label: "Oldest" },
// ];

// ----------------------------------------------------------------------

export default function MessageChat(props) {
  // const [anchorEl, setAnchorEl] = useState(null);
  // const inputMessageRef = useRef();
  const dispatch = useDispatch();
  const listMessages = useSelector((state) => state.roomchat.listMessages);

  MessageChat.propTypes = {
    props: PropTypes.bool.isRequired,
  };

  useEffect(() => {
    dispatch(actions.fetchAllMessages(props.activeRoom.id));
  }, [props.activeRoom]);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

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
            style={{ height: "75%", borderBottom: "1px solid #e9e7e5" }}
          >
            {listMessages.length > 0 ? (
              <MessageContent listMessages={listMessages} />
            ) : (
              <p>Let's say something</p>
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
                <IconButton aria-label="search" style={{ width: 50 }}>
                  <ChildCareIcon />
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
                item
                xs={12}
                style={{ height: "60%" }}
                style={{ paddingLeft: 10, paddingRight: 10, display: "flex" }}
              >
                {/* <InputBase
                  placeholder="Nhập tin nhắn của bạn"
                  inputProps={{ "aria-label": "search google maps" }}
                  fullWidth
                /> */}
                <MessageInput />

                {/* Sending Icon */}
                {/* <IconButton
                  type="submit"
                  aria-label="search"
                  style={{ width: 50 }}
                >
                  <EmojiEmotionsIcon onClick={handleClick} />
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    style={{
                      transform: "translateX(0) translateY(-11%)",
                    }}
                    onClose={handleClose}
                  >
                    <div style={{ textAlign: "center" }}>
                      <Picker skinTone={SKIN_TONE_MEDIUM_DARK} />
                    </div>
                  </Menu>
                </IconButton> */}

                <Divider orientation="vertical" />

                {/* Seding button */}
                <IconButton
                  color="primary"
                  aria-label="directions"
                  style={{ width: 50 }}
                >
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
