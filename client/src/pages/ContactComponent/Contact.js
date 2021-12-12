import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tab, Box } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Page from 'src/components/Page';
// material
import { Container, Stack, Typography } from '@material-ui/core';
import SearchContact from './Search';
import AllContact from './AllContact';
import AllSend from './AllSend';
import AllReceive from './AllReceive';
import { io } from "socket.io-client";
import * as actions from "../../actions/contact.action";
import Notifycation from "../UserComponent/Notifycation";
// components

// ----------------------------------------------------------------------
const URL = "ws://localhost:3030/";
export default function Contact() {
    const dispatch = useDispatch();
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "Hello",
        type: "success",
    });
    const user = useSelector((state) => state.customer.userAuth);
    const socket = useRef();
    useEffect(() => {
        socket.current = io(URL);
        socket.current.on("send", (data) => {
            if (data.userReceive === Number(user)) {
                setNotify({
                    isOpen: true,
                    message:
                        `Bạn đã nhận một lời mời kết bạn từ! ${data.userSend}`,
                    type: "success",
                })
                console.log(data.userReceive)
            }

        });
    }, []);
    const allContact = useSelector((state) => state.contact.listcontact);
    const [allContactTab, setAllContactTab] = useState([]);

    const allReceive = useSelector(state => state.contact.listReceive);
    const [receiveContact, setReceiveContact] = useState([])

    const allSend = useSelector(state => state.contact.listSend);
    const [sendContact, setSendContact] = useState([])
    //All
    useEffect(() => {
        dispatch(actions.fetchAllContact(user));
    }, []);
    useEffect(() => {
        if (allContact) {
            setAllContactTab(allContact)
        }
    }, [allContact]);
    //Receive
    useEffect(() => {
        dispatch(actions.fetchReceiveContact(user));
    }, []);
    useEffect(() => {
        if (allReceive) {
            setReceiveContact(allReceive)
        }
    }, [allReceive]);
    //Send
    useEffect(() => {
        dispatch(actions.fetchSendContact(user));
    }, []);
    useEffect(() => {
        if (allSend) {
            setSendContact(allSend)
        }
    }, [allSend]);

    const [value, setValue] = useState('1');
    console.log(allContact)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Page title="Trang liên hệ | WeeAllo">
            <Notifycation notify={notify} setNotify={setNotify} />
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Liên hệ
                </Typography>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Tìm kiếm liên hệ" value="1" />
                                <Tab label={"Tất cả bạn bè " + "( " + allContactTab.length + " )"} value="2"></Tab>
                                <Tab label={"Các lời mời đã gửi " + "( " + allSend.length + " )"} value="3" />
                                <Tab label={"Các lời mời đã nhận" + "( " + allReceive.length + " )"} value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><SearchContact /></TabPanel>
                        <TabPanel value="2"><AllContact /></TabPanel>
                        <TabPanel value="3"><AllSend /></TabPanel>
                        <TabPanel value="4"><AllReceive /></TabPanel>
                    </TabContext>
                </Box>
            </Container>
        </Page >
    );
}
