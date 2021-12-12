import React from "react";
import { useState, Fragment } from "react";

import { Grid, TextField } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@material-ui/core/IconButton";
import ModalAddGroup from "./ModalAddGroup/ModalAddGroup";

export default function SearchFriend(props) {
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const searchRoom = (event) => {
    props.getKeyword(event.target.value);
  };

  return (
    <Fragment>
      <ModalAddGroup
        openModal={openModal}
        onCloseModal={closeModalHandler}
        onNeedLoad={props.onNeedLoad}
      />
      <div
        style={{
          height: "100%",
          padding: "20px",
          width: "100%",
          display: "flex",
          position: "inherit",
        }}
      >
        <Grid container style={{ display: "flex", position: "inherit" }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
          >
            <FormControl style={{ width: "100%" }}>
              <TextField
                id="input-with-icon-textfield"
                size="small"
                fullWidth
                onChange={searchRoom}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ paddingBottom: "5px", borderBottom: "1px solid #e9e7e5" }}
          >
            {/* create group chat */}
            <IconButton aria-label="delete" onClick={openModalHandler}>
              <GroupAddIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} style={{ paddingTop: "10px" }}>
            <p style={{ fontWeight: "bold" }}>Tất cả tin nhắn</p>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
