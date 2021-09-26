import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Search } from '@material-ui/icons';
import scanner from 'src/access/ImageIcon/scanner.jpg';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Avatar, AppBar, TextField, Tab, Tabs, Button, Card, CardContent, Icon, Toolbar, Typography, Box, Grid } from '@material-ui/core';
// ----------------------------------------------------------------------
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { display, height } from '@material-ui/system';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../../actions/contact.action";
import Scrollbar from "src/components/Scrollbar";
import Label from 'src/components/Label';
import Snackbar from '@material-ui/core/Snackbar';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
// ----------------------------------------------------------------------


export default function SearchContact() {
    const qrRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('');
    const [textsearch, setTextSearch] = useState('')
    const dispatch = useDispatch();
    const listSearch = useSelector(state => state.contact.listSearchContact)
    const user = useSelector(state => state.customer.userAuth);
    const detail = useSelector(state => state.contact.detailContact)
    const userQR = useSelector(state => state.contact.userQR)
    const [userQRCode, setUserQRCode] = React.useState(null);
    // const friendQR = useSelector(state => state.friend.findId)
    const [listSearchFriend, setListSearch] = useState([])
    const [detailContact, setDetailContact] = useState([])
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [idDelete, setIdDelete] = useState(0);
    const [messageToast, setMessageToast] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);
    const [openToast, setOpenToast] = React.useState(false);
    function handleTabChange(event, value) {
        setSelectedTab(value);
    }
    const handleClick = () => {
        setOpenToast(true);
    };
    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleClickOpen3 = () => {
        setOpen3(true);
    };
    const handleClose3 = () => {
        setOpen3(false);
    };
    const handleClickOpen4 = () => {
        setOpen4(true);
    };
    const handleClose4 = () => {
        setOpen4(false);
    };
    useEffect(() => {
        dispatch(actions.searchContact(''))
    }, [])

    useEffect(() => {
        setListSearch(listSearch)
    }, [listSearch])
    useEffect(() => {
        if (detail !== undefined) {
            setDetailContact(detail)
        }
    }, [detail])
    useEffect(() => {
        if (userQR !== undefined) {
            setUserQRCode(userQR)
        }
    }, [userQR])
    useEffect(() => {
        dispatch(actions.findUserById(user))
    }, [user])
    useEffect(() => {
        if (userQRCode !== null) {
            const generateQrCode = async () => {
                try {
                    const response = await QRCode.toDataURL("0987654321");
                    setImageUrl(response);
                } catch (error) {
                    console.log(error);
                }
            }
            generateQrCode()
        }
    }, [userQRCode])
    const handleErrorFile = (error) => {
        console.log(error);
    }
    const onScanFile = () => {
        qrRef.current.openImageDialog();
    }
    const handleScanFile = (result) => {
        if (result) {
            dispatch(actions.searchContact(result))
        }
        console.log(result)
    }
    const renderRelationShip = () => {
        if (detailContact == null) {
            return (
                <div></div>
            )
        }
        else {
            if (detailContact.status === 'friend') {
                return (
                    <Label
                        variant="ghost"
                        color={'success'}
                    >
                        Bạn bè
                    </Label>
                )
            }
            else if (detailContact.status === 'send') {
                return (
                    <Label
                        variant="ghost"
                        color={'success'}
                    >
                        Người này đã gửi lời mời kết bạn cho bạn
                    </Label>
                )
            }
            else if (detailContact.status === 'receive') {
                return (
                    <Label
                        variant="ghost"
                        color={'success'}
                    >
                        Lời mời kết bạn đã gửi cho người này
                    </Label>
                )
            }
            else if (detailContact.status === 'you') {
                return (
                    <Label
                        variant="ghost"
                        color={'success'}
                    >
                        Tài khoản cá nhân của bạn
                    </Label>
                )
            }
            else if (detailContact.status === 'none') {
                return (
                    <Label
                        variant="ghost"
                        color={'success'}
                    >
                        Các bạn chưa là bạn bè
                    </Label>
                )
            }
        }
    }
    const renderButton = () => {
        if (detailContact == null) {
            return (
                <div></div>
            )
        }
        else {
            if (detailContact.status === 'friend') {
                return (
                    <Button
                        style={{ fontSize: 10, backgroundColor: 'rgb(180, 0, 0)', color: 'white', marginLeft: 50, marginRight: 50 }}
                        onClick={() => {
                            setIdDelete(detailContact.id)
                            handleClickOpen1()
                        }}
                        fullWidth
                        color="primary">
                        Hủy kết bạn
                    </Button>
                )
            }
            else if (detailContact.status === 'send') {
                return (
                    <Button
                        style={{ fontSize: 10, backgroundColor: '#3c4454', color: 'white', marginLeft: 50, marginRight: 50 }}
                        onClick={() => {
                            setIdDelete(detailContact.id)
                            handleClickOpen2()
                        }}
                        fullWidth
                        color="primary">
                        Từ chối
                    </Button>
                )
            }
            else if (detailContact.status === 'receive') {
                return (
                    <Button
                        style={{ fontSize: 10, backgroundColor: 'rgb(180, 0, 0)', color: 'white', marginLeft: 50, marginRight: 50 }}
                        onClick={() => {
                            setIdDelete(detailContact.id)
                            handleClickOpen3()
                        }}
                        fullWidth
                        color="primary">
                        Hủy lời mời
                    </Button>
                )
            }
            else if (detailContact.status === 'none') {
                return (
                    <Button
                        style={{ fontSize: 10, backgroundColor: '#3c4454', color: 'white', marginLeft: 50, marginRight: 50 }}
                        onClick={() => {
                            dispatch(actions.addContact(user, detailContact.id))
                            setMessageToast('Lời mời kết bạn đã được gửi')
                            handleClick()
                            handleClose();
                        }}
                        fullWidth
                        color="primary">
                        Gửi lời mời
                    </Button>
                )
            }
            else if (detailContact.status === 'you') {
                return (
                    <div></div>
                )
            }
        }
    }
    const renderListSearch = () => {
        if (!listSearchFriend.length) {
            return (
                <div>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Search fontSize="large" />
                        <Typography variant="h5">
                            Không tìm thấy lời mời nào đã gửi
                        </Typography>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ width: '100%' }}>
                    {
                        listSearchFriend.map((record, index) => {
                            return (
                                <Scrollbar key={index}>
                                    <div style={{ width: '100%', paddingTop: 20 }} >
                                        <Paper>
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <ButtonBase>
                                                        <Avatar style={{ height: 70, width: 70 }}
                                                        ></Avatar>
                                                    </ButtonBase>
                                                </Grid>
                                                <Grid item xs={12} sm container>
                                                    <Grid item xs container direction="column" spacing={2}>
                                                        <Grid item xs>
                                                            <Typography gutterBottom variant="subtitle1">
                                                                {record.firstname + " " + record.lastname}
                                                            </Typography>
                                                            <Typography variant="body2" gutterBottom>
                                                                Người dùng
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            style={{ float: "right", fontSize: "10px", marginTop: '30px' }}
                                                            onClick={() => {
                                                                handleClickOpen();
                                                                dispatch(actions.detailContact(user, record.id))
                                                            }}
                                                        >
                                                            Chi tiết
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </div>
                                </Scrollbar>
                            )
                        })
                    }
                </div >
            )
        }
    }
    const renderQR = () => {
        if (detailContact !== null) {
            return (
                <Paper
                    style={{
                        height: '100%',
                        width: '100%',
                    }}>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 10, height: 200 }}
                    >
                        <Avatar style={{ height: 100, width: 100, marginTop: 50 }}
                        ></Avatar>
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 20 }}
                    >
                        <h3>{detailContact ? detailContact.firstname + " " + detailContact.lastname : 'Not Found'}</h3>
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 20 }}
                    >
                        {renderRelationShip()}
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 20 }}
                    >
                        Số điện thoại : {detailContact ? detailContact.phone : 'Not Found'}
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 30 }}
                    >
                        {renderButton()}
                    </Box>
                </Paper>
            )
        } else {
            return (
                <Paper
                    style={{
                        height: '100%',
                        width: '100%',
                    }}>
                    <Box display="flex"
                        justifyContent="center"
                        style={{ paddingTop: 10 }}
                    >
                        Không tìm thấy bạn nào
                    </Box>
                </Paper>
            )
        }

    }
    return (
        <div style={{ height: '100%', padding: '20px', width: '100%', position: 'inherit' }}>
            <Grid container style={{ display: 'flex', position: 'inherit' }}>
                <Grid item xs={12} sm={12} md={12} style={{ paddingTop: 10, paddingBottom: 30, display: 'flex' }}>
                    <FormControl style={{ width: '100%' }}>
                        <TextField
                            id="input-with-icon-textfield"
                            size="medium"
                            fullWidth
                            onChange={(e) => {
                                dispatch(actions.searchContact(e.target.value))
                                setTextSearch(e.target.value);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <IconButton onClick={() => {
                        handleClickOpen4()
                    }}>
                        <img src={scanner} height={40} />
                    </IconButton>
                </Grid>
            </Grid>
            {renderListSearch()}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth={'xs'}
                size="medium"
            >
                <DialogTitle id="alert-dialog-title">{"Thêm bạn"}</DialogTitle>
                <DialogContent>
                    <Paper
                        style={{
                            height: '100%',
                            width: '100%',
                        }}>
                        <Box display="flex"
                            justifyContent="center"
                            style={{ paddingTop: 10, height: 200 }}
                        >
                            <Avatar style={{ height: 100, width: 100, marginTop: 50 }}
                            ></Avatar>
                        </Box>
                        <Box display="flex"
                            justifyContent="center"
                            style={{ paddingTop: 20 }}
                        >
                            <h3>{detailContact ? detailContact.firstname + " " + detailContact.lastname : 'Not Found'}</h3>
                        </Box>
                        <Box display="flex"
                            justifyContent="center"
                            style={{ paddingTop: 20 }}
                        >
                            {renderRelationShip()}
                        </Box>
                        <Box display="flex"
                            justifyContent="center"
                            style={{ paddingTop: 20 }}
                        >
                            Số điện thoại : {detailContact ? detailContact.phone : 'Not Found'}
                        </Box>
                        <Box display="flex"
                            justifyContent="center"
                            style={{ paddingTop: 30 }}
                        >
                            {renderButton()}
                        </Box>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error" autoFocus>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={open1}
                onClose={handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{""}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Người này sẽ không còn liên hệ <br /> với bạn
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ fontSize: 10, backgroundColor: 'rgb(180, 0, 0)', color: 'white' }}
                        onClick={() => {
                            setMessageToast('Đã hủy kết bạn với người này')
                            handleClose1()
                            handleClick()
                            handleClose()
                            dispatch(actions.deleteAllContact(user, idDelete))
                        }}
                        color="primary">
                        Xóa kết bạn
                    </Button>
                    <Button style={{ fontSize: 10, backgroundColor: '#C67732 ', color: 'white' }} onClick={handleClose} color="primary" autoFocus>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{""}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Từ chối lời mời kết bạn này
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ fontSize: 10, backgroundColor: 'rgb(180, 0, 0)', color: 'white' }}
                        color="primary"
                        onClick={() => {
                            setMessageToast('Đã từ chối lời mời kết bạn của người này')
                            dispatch(actions.deleteReceiveContact(user, idDelete))
                            handleClick()
                            handleClose()
                            handleClose2()
                        }}
                    >
                        Từ chối
                    </Button>
                    <Button style={{ fontSize: 10, backgroundColor: '#C67732 ', color: 'white' }} onClick={handleClose} color="primary" autoFocus>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={open3}
                onClose={handleClose3}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{""}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xóa lời mời kết bạn với người này
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ fontSize: 10, backgroundColor: 'rgb(180, 0, 0)', color: 'white' }}
                        onClick={() => {
                            setMessageToast('Đã xóa lời mời kết bạn với người này')
                            dispatch(actions.deleteSendContact(user, idDelete));
                            handleClick()
                            handleClose()
                            handleClose3();
                        }}
                        color="primary">
                        Xóa lời mời
                    </Button>
                    <Button style={{ fontSize: 10, backgroundColor: '#C67732 ', color: 'white' }} onClick={handleClose} color="primary" autoFocus>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={open4}
                onClose={handleClose4}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth={'md'}
            >
                <DialogTitle id="alert-dialog-title">{"Thêm bạn bằng QR Code"}</DialogTitle>
                <DialogContent style={{ width: '100%' }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="off"
                    >
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Quét mã QR" />
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Mã QR của tôi" />
                    </Tabs>
                    {selectedTab === 0 && (
                        <div>
                            <Button
                                style={{ fontSize: 10, backgroundColor: '#006600', color: 'white', marginBottom: 5, marginTop: 5 }}
                                onClick={onScanFile}
                            >
                                Tải lên mã QR
                            </Button>
                            <Grid container component="span" spacing={1}>
                                <Grid item xs={6}>
                                    <QrReader
                                        ref={qrRef}
                                        delay={300}
                                        style={{ width: '100%' }}
                                        onError={handleErrorFile}
                                        onScan={handleScanFile}
                                        legacyMode
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    )}
                    {selectedTab === 1 && (
                        <div>
                            <Grid container component="span" spacing={1} style={{ paddingTop: 39, width: '100%', alignItems: 'center', textAlign: 'center' }}>
                                {imageUrl ? (
                                    <a href={imageUrl} download style={{ width: '100%' }}>
                                        <img src={imageUrl} alt="img" style={{ width: '50%' }} />
                                    </a>) : null}
                            </Grid>
                            {genderQR()}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose4} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openToast}
                autoHideDuration={2000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                onClose={handleCloseToast}

                message={messageToast}
            />
        </div >
    );
}
