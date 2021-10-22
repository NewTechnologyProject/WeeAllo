import React, { useState, Fragment, useCallback, useEffect } from "react";

import classes from "./ChatInformation.module.css";
import Scrollbar from "src/components/Scrollbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { fetchAllMembers } from "src/actions/roomchat.action";
import ModalAddMember from "./ModalAddMembers/ModalAddMember";
import { Grid } from "@material-ui/core";
import GroupChatMember from "./GroupChatMembers";
import ImagesShow from "./ImagesShow";
import Functions from "./Functions";

export default function ChatInfomation(props) {
  const [open, setOpen] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [listMembers, setListMembers] = useState([]);
  const [needLoadMembers, setNeedLoadMembers] = useState({ name: "new" });

  const getListMembers = useCallback((roomId) => {
    fetchAllMembers(roomId)
      .then((response) => {
        setListMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (needLoadMembers) {
      getListMembers(props.activeRoom.id);
    }
  }, [fetchAllMembers, props.activeRoom.id, needLoadMembers]);

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
          <h4 className={classes.h4}>THÔNG TIN NHÓM</h4>
        </div>

        {/* Information */}
        <div className={classes.list}>
          <Scrollbar
            sx={{
              height: "100%",
            }}
          >
            {/* Members of group chat */}
            <GroupChatMember
              handleClick={handleClick}
              creator={props.activeRoom.creator}
              members={listMembers}
              open={open}
              onOpenModal={openModalHandler}
            />

            {/*Show images  */}
            <ImagesShow openImage={openImage} onClickImage={handleClickImage} />

            {/*Show files  */}
            <List component="nav" aria-labelledby="nested-list-subheader">
              <ListItem button onClick={handleClickFile}>
                <ListItemText primary="File" />
                {openFile ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openFile} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Grid container>
                    <Grid item xs={4} className={classes.imgFile}>
                      <ListItem button>
                        <img
                          className={classes.imgFile}
                          src="https://file-upload-weeallo-02937.s3.ap-southeast-1.amazonaws.com/1634205302114-b4a4c42481d37b8d22c2.jpg
                      "
                        />
                      </ListItem>
                    </Grid>
                    <Grid item xs={4} className={classes.imgFile}>
                      <ListItem button>
                        <img
                          className={classes.imgFile}
                          src="https://file-upload-weeallo-02937.s3.ap-southeast-1.amazonaws.com/1633608170833-FB_IMG_1621397369344.jpg"
                        />
                      </ListItem>
                    </Grid>
                    <Grid item xs={4} className={classes.imgFile}>
                      <ListItem button>
                        <img src="https://halotravel.vn/wp-content/uploads/2020/07/thach_trangg_103512340_187758299273938_8335419467587726993_n.jpg" />
                      </ListItem>
                    </Grid>
                  </Grid>
                </List>
              </Collapse>
            </List>

            {/* Other functions */}
            <Functions
              creator={props.activeRoom.creator}
              roomId={props.activeRoom.id}
              onClickSetting={handleClickSetting}
              openSetting={openSetting}
              onNeedLoad={props.onNeedLoad}
              onSetActiveRoomNull={props.onSetActiveRoomNull}
              members={listMembers}
            />
          </Scrollbar>
        </div>
      </div>
    </Fragment>
  );
}
