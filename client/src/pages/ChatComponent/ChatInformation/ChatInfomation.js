import React, { useState, Fragment, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./ChatInformation.module.css";
import Scrollbar from "src/components/Scrollbar";
import { fetchAllMembers } from "src/actions/roomchat.action";
import ModalAddMember from "./ModalAddMembers/ModalAddMember";
import GroupChatMember from "./GroupChatMembers";
import ImagesShow from "./ImagesShow";
import FilesShow from "./FilesShow";
import Functions from "./Functions";

export default function ChatInfomation(props) {
  const [open, setOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [listMembers, setListMembers] = useState([]);
  const [listFiles, setListFiles] = useState({ files: [], media: [] });
  const [needLoadMembers, setNeedLoadMembers] = useState({ name: "new" });
  const listMessages = useSelector((state) => state.roomchat.listMessages);
  const newMessage = useSelector((state) => state.message.message);

  const getListMembers = useCallback((roomId) => {
    fetchAllMembers(roomId)
      .then((response) => {
        setListMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          media: [...prevState.media, { key: message.id, url: message.image }],
        };
      });
    }
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

  return (
    <Fragment>
      <ModalAddMember
        openModal={openModal}
        onCloseModal={closeModalHandler}
        members={listMembers}
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
              <GroupChatMember
                handleClick={handleClick}
                creator={props.activeRoom.creator}
                roomId={props.activeRoom.id}
                members={listMembers}
                open={open}
                onOpenModal={openModalHandler}
                onNeedLoad={needLoadHandler}
              />
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
