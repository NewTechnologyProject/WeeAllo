// // material
// import { Grid, Button, Container, Stack, Typography } from "@material-ui/core";
// // components
// import Page from "src/components/Page";
// //ort POSTS from '../_mocks_/blog';
// import MessageChat from "./Message";
// import SearchFriend from "./Search";
// import ListFriendChat from "./ListFriendChat";
// import { alpha, styled } from "@material-ui/core/styles";
// import { Card } from "@material-ui/core";
// import * as actions from "src/actions/customer.action";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import classes from "./Chat.module.css";
// import { useNavigate } from "react-router-dom";
import Scrollbar from "src/components/Scrollbar";
// ----------------------------------------------------------------------
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import List from '@material-ui/core/List';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
    createStyles({
        parentsDiv: {
            borderBottom: '1px solid  #e9e7e5'
        },
        h4: {
            padding: 20,
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
        },
        imgFile: {
            height: 70,
            width: '100%'
        },
        textColor: {
            color: '#A80505'
        }
    })
);
export default function ChatInfomation(props) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const [openFile, setOpenFile] = React.useState(false);

    const handleClickFile = () => {
        setOpenFile(!openFile);
    };
    const [openSetting, setOpenSetting] = React.useState(false);

    const handleClickSetting = () => {
        setOpenSetting(!openSetting);
    };
    const classes = useStyles();
    return (
        <div>
            <div className={classes.parentsDiv}>
                <h4 className={classes.h4}>THÔNG TIN NHÓM</h4>
            </div>
            <Scrollbar
                sx={{
                    height: "100%",
                }}
            >
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    <ListItem button onClick={handleClick}>
                        <ListItemText primary="Thành viên nhóm: 5" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <Avatar />
                                </ListItemIcon>
                                <ListItemText primary="Tuấn Khang" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    <ListItem button onClick={handleClickFile}>
                        <ListItemText primary="File/Ảnh/Video" />
                        {openFile ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openFile} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Grid container>
                                <Grid xs={4} className={classes.imgFile}>
                                    <ListItem button className={classes.nested}>
                                        <img className={classes.imgFile} src="https://halotravel.vn/wp-content/uploads/2020/07/thach_trangg_79484888_172754317141414_3036467530455897785_n.jpg" />
                                    </ListItem>
                                </Grid>
                                <Grid xs={4} className={classes.imgFile}>
                                    <ListItem button className={classes.nested}>
                                        <img className={classes.imgFile} src="https://file-upload-weeallo-02937.s3.ap-southeast-1.amazonaws.com/1633608170833-FB_IMG_1621397369344.jpg" />
                                    </ListItem>
                                </Grid>
                                <Grid xs={4} className={classes.imgFile}>
                                    <ListItem button className={classes.nested}>
                                        <img src="https://halotravel.vn/wp-content/uploads/2020/07/thach_trangg_103512340_187758299273938_8335419467587726993_n.jpg" />
                                    </ListItem>
                                </Grid>
                            </Grid>
                        </List>
                    </Collapse>
                </List>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    <ListItem button onClick={handleClickSetting}>
                        <ListItemText primary="Cài đặt khác" />
                        {openSetting ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openSetting} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested, classes.textColor}>
                                <ListItemIcon>
                                    <DeleteOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="Xóa nhóm" />
                            </ListItem>
                            <ListItem button className={classes.nested, classes.textColor}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Rời nhóm" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Scrollbar>
        </div>
    );
}
