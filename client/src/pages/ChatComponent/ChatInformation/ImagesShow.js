import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./ImagesShow.module.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";

const ImagesShow = (props) => {
  const { listMedia } = props;

  console.log(listMedia);

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={props.onClickImage}>
        <ListItemText primary="Ảnh/Video" />
        {props.openImage ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={props.openImage} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Grid container>
            {listMedia &&
              listMedia.map((media) => (
                <Grid
                  item
                  xs={4}
                  padding={0.3}
                  className={classes.item}
                  key={media.key}
                >
                  <a
                    href={media.url}
                    target="_blank"
                    className={classes.link}
                  ></a>
                  <img className={classes.imgFile} src={media.url} />
                </Grid>
              ))}

            {listMedia.length === 0 && (
              <Grid item xs={12} padding={0.3}>
                <div className={classes.nothing}>
                  <p>Chưa có hình ảnh, video</p>
                </div>
              </Grid>
            )}
          </Grid>
        </List>
      </Collapse>
    </List>
  );
};

export default ImagesShow;
