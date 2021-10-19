import React from "react";

import classes from "./ImagesShow.module.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";

const ImagesShow = (props) => {
  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={props.onClickImage}>
        <ListItemText primary="Ảnh/Video" />
        {props.openImage ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={props.openImage} timeout="auto" unmountOnExit>
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
  );
};

export default ImagesShow;
