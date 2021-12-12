import React, { useState, Fragment, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./ChatInformation.module.css";
import Scrollbar from "src/components/Scrollbar";
import {
  fetchAllMembers,
  fetchAllMembersWithUserAdd,
  updateInfo,
  uploadAvatar,
} from "src/actions/roomchat.action";
import { fetchAllRoom } from "src/actions/customer.action";
import ModalAddMember from "./ModalAddMembers/ModalAddMember";
import GroupChatMember from "./GroupChatMembers";
import ImagesShow from "./ImagesShow";
import FilesShow from "./FilesShow";
import Functions from "./Functions";
import IconButton from "@mui/material/IconButton";
import { Avatar, TextField, Button } from "@material-ui/core";

export default function ChatInfomation(props) {
  const [open, setOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [listMembers, setListMembers] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [updatedRoomName, setUpdatedRoomName] = useState(
    props.activeRoom.roomName
  );
  const [listMembersWithUserAdd, setListMembersWithUserAdd] = useState([]);
  const [helperText, setHelperText] = useState({ error: false, text: " " });
  const [listFiles, setListFiles] = useState({ files: [], media: [] });
  const [needLoadMembers, setNeedLoadMembers] = useState({ name: "new" });
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const newMessage = useSelector((state) => state.message.message);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user_authenticated");

  const getListMembers = useCallback((roomId) => {
    fetchAllMembers(roomId)
      .then((response) => {
        setListMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchAllMembersWithUserAdd(roomId)
      .then((response) => {
        setListMembersWithUserAdd(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getFileType = (str) => {
    let re = /(?:\.([^.]+))?$/;
    return re.exec(str)[1];
  };

  const getFilesAndMedia = (message) => {
    if (message.file) {
      setListFiles((prevState) => {
        return {
          files: [...prevState.files, { key: message.id, url: message.file }],
          media: [...prevState.media],
        };
      });
    }

    if (message.image) {
      setListFiles((prevState) => {
        return {
          files: [...prevState.files],
          media: [
            ...prevState.media,
            { key: message.id, url: message.image, type: "image" },
          ],
        };
      });
    }

    if (message.video) {
      setListFiles((prevState) => {
        return {
          files: [...prevState.files, { key: message.id, url: message.video }],
          media: [...prevState.media],
        };
      });
    }
  };

  const getAvatarUrl = (event) => {
    setAvatarUrl(event.target.files[0]);
  };

  useEffect(() => {
    if (needLoadMembers) {
      getListMembers(props.activeRoom.id);
    }
  }, [fetchAllMembers, props.activeRoom.id, needLoadMembers]);

  useEffect(() => {
    if (props.activeRoom && listMessages) {
      setListFiles({ files: [], media: [] });

      listMessages.map((message) => {
        getFilesAndMedia(message);
      });
    }
  }, [props.activeRoom, listMessages]);

  useEffect(() => {
    if (newMessage) {
      getFilesAndMedia(newMessage);
    }
  }, [newMessage]);

  useEffect(() => {
    setAvatarUrl(null);
    setUpdatedRoomName(props.activeRoom.roomName);
  }, [props.activeRoom]);

  const needLoadHandler = (newMembers) => {
    setNeedLoadMembers(newMembers);
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const handleClickImage = () => {
    setOpenImage(!openImage);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickFile = () => {
    setOpenFile(!openFile);
  };

  const handleClickSetting = () => {
    setOpenSetting(!openSetting);
  };

  const reset = () => {
    setAvatarUrl(null);
    setUpdatedRoomName(props.activeRoom.roomName);
  };

  const showAvatar = () => {
    if (avatarUrl) {
      return URL.createObjectURL(avatarUrl);
    }
    if (props.activeRoom.avatar) {
      return props.activeRoom.avatar;
    }
    return "dummy.js";
  };

  const getUpdatedRoomName = (event) => {
    const name = event.target.value;
    const regex = new RegExp("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$");
    if (name.length === 0) {
      setHelperText({ error: false, text: " " });
    } else if (name.length >= 18) {
      setHelperText({ error: true, text: "Tên phải bé hơn 18 kí tự" });
    } else if (!regex.test(name)) {
      setHelperText({
        error: true,
        text: "Tên không hợp lệ",
      });
    } else {
      setHelperText({ error: false, text: " " });
    }
    setUpdatedRoomName(name);
  };

  const updateRoomInfo = (name, avatar) => {
    const newRoom = {
      ...props.activeRoom,
      roomName: name,
      avatar: avatar,
    };

    updateInfo(props.activeRoom.id, newRoom)
      .then((res) => {
        console.log("success");
        props.getUpdatedRoom(newRoom);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateRoom = (name, avatar) => {
    let updateName = name;
    let updateAvatar = avatar;

    if (!updateName) {
      updateName = props.activeRoom.roomName;
    }
    if (updateName.includes(".")) {
      updateName = null;
    }

    // Get avatar link from aws s3
    if (updateAvatar) {
      const formData = new FormData();
      formData.append("file", updateAvatar);

      uploadAvatar(formData)
        .then((response) => {
          updateRoomInfo(updateName, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updateRoomInfo(updateName, props.activeRoom.avatar);
    }
  };

  const submitHandler = () => {
    updateRoom(updatedRoomName, avatarUrl);
  };

  return (
    <Fragment>
      <ModalAddMember
        openModal={openModal}
        onCloseModal={closeModalHandler}
        members={listMembers}
        membersWithUserAdd={listMembersWithUserAdd}
        activeRoomId={props.activeRoom.id}
        onNeedLoad={needLoadHandler}
      />
      <div className={classes.contain}>
        {/* Title */}
        <div className={classes.parentsDiv}>
          <p>THÔNG TIN NHÓM</p>
        </div>

        {/* Information */}
        <div className={classes.list}>
          <Scrollbar
            sx={{
              height: "100%",
            }}
          >
            {/* Members of group chat */}
            {props.activeRoom.creator && (
              <Fragment>
                <div className={classes["image-content"]}>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="icon-button-file"
                    type="file"
                    onChange={getAvatarUrl}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton component="span">
                      <Avatar
                        alt={updatedRoomName}
                        className={classes.image}
                        src={showAvatar()}
                      />
                    </IconButton>
                  </label>

                  <TextField
                    label="Tên Nhóm"
                    variant="outlined"
                    size="small"
                    error={helperText.error}
                    helperText={helperText.text}
                    value={updatedRoomName ? updatedRoomName : ""}
                    style={{ marginTop: 18 }}
                    onChange={getUpdatedRoomName}
                  />
                  <div className={classes["button-contain"]}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={submitHandler}
                      disabled={helperText.error}
                    >
                      Cập nhật
                    </Button>
                    <Button size="small" onClick={reset}>
                      Hủy
                    </Button>
                  </div>
                </div>

                <GroupChatMember
                  handleClick={handleClick}
                  creator={props.activeRoom.creator}
                  roomId={props.activeRoom.id}
                  members={listMembers}
                  membersWithUserAdd={listMembersWithUserAdd}
                  open={open}
                  onOpenModal={openModalHandler}
                  onNeedLoad={needLoadHandler}
                />
              </Fragment>
            )}

            {/*Show images  */}
            <ImagesShow
              listMedia={listFiles.media}
              openImage={openImage}
              onClickImage={handleClickImage}
            />

            {/*Show files  */}
            <FilesShow
              listFiles={listFiles.files}
              openFile={openFile}
              onClickFile={handleClickFile}
            />

            {/* Other functions */}
            {props.activeRoom.creator && (
              <Functions
                creator={props.activeRoom.creator}
                roomId={props.activeRoom.id}
                onClickSetting={handleClickSetting}
                openSetting={openSetting}
                onNeedLoad={props.onNeedLoad}
                onSetActiveRoomNull={props.onSetActiveRoomNull}
                members={listMembers}
              />
            )}
          </Scrollbar>
        </div>
      </div>
    </Fragment>
  );
}
