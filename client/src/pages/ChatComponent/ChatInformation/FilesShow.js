import React, { useEffect, useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import classes from "./FilesShow.module.css";

const FilesShow = (props) => {
  const { listFiles: files } = props;

  const getFileName = (str) => {
    const str1 = str.split("/")[3];
    const str2 = str1.substring(str1.indexOf("-") + 1);
    return str2;
  };

  const getType = (str) => {
    const str1 = str.split(".")[5];
    return str1;
  };

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={props.onClickFile}>
        <ListItemText primary="File" />
        {props.openFile ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={props.openFile} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Grid container>
            {files &&
              files.map((file, i) => (
                <Grid item xs={12} padding={1} className={classes.item} key={i}>
                  <FileIcon
                    extension={getType(file.url)}
                    {...defaultStyles[getType(file.url)]}
                    className={classes.icon}
                  />
                  <a href={file.url} className={classes.text} target="_blank">
                    {getFileName(file.url)}
                  </a>
                </Grid>
              ))}

            {files.length === 0 && (
              <div className={classes.nothing}>
                <p>Chưa có file</p>
              </div>
            )}
          </Grid>
        </List>
      </Collapse>
    </List>
  );
};

export default FilesShow;
