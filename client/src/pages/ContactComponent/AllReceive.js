import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import * as actions from "../../actions/contact.action";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import userAvatar from 'src/access/UserImage/user.png';
import { Search } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';

// ----------------------------------------------------------------------

export default function AllReceive() {
    const dispatch = useDispatch();
    const allReceive = useSelector(state => state.contact.listReceive);
    const user = useSelector(state => state.customer.userAuth);
    const [receiveContact, setReceiveContact] = useState([])
    const [open, setOpen] = React.useState(false);
    const [idDelete, setIdDelete] = useState(0);
    const [openToast, setOpenToast] = React.useState(false);
    const [openToast1, setOpenToast1] = React.useState(false);
    const handleClick = () => {
        setOpenToast(true);
    };
    const handleClick1 = () => {
        setOpenToast1(true);
    };
    const handleClickOpen = (id) => {
        setOpen(true);
        setIdDelete(id)
    };
    const handleCloseToast1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast1(false);
    };
    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        dispatch(actions.fetchReceiveContact(user))
    }, [])
    useEffect(() => {
        setReceiveContact(allReceive)
    }, [allReceive])
    const genderListReceiveContact = () => {
        if (!receiveContact.length) {
            return (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Search fontSize="large" />
                    <Typography variant="h5">
                        Không tìm thấy lời mời kết bạn nào đã nhận
                    </Typography>
                </div>
            )
        }
        else {
            return (
                <Grid container style={{ display: 'flex', position: 'inherit' }}>
                    {receiveContact.map((record, index) =>
                        <Grid item xs={6} sm={12} md={3} style={{ padding: 10 }} key={index}>
                            <Card >
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="250"
                                    image={userAvatar}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {record.firstname + " " + record.lastname}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'center' }}>
                                    <Button
                                        size="medium"
                                        color="success"
                                        variant="outlined"
                                        fullWidth
                                        onClick={() => {
                                            dispatch(actions.acceptContact(record.id, user))
                                            handleClick1()
                                        }}
                                    >Đồng ý</Button>
                                    <Button
                                        size="medium"
                                        color="error"
                                        variant="outlined"
                                        fullWidth
                                        onClick={(ev) => {
                                            handleClickOpen(record.id);
                                        }}
                                    >Từ chối</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            )
        }
    }
    return (
        <div style={{ height: '100%', padding: '20px', width: '100%', display: 'flex', position: 'inherit' }}>
            {genderListReceiveContact()}
            <Dialog
                open={open}
                onClose={handleClose}
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
                            dispatch(actions.deleteReceiveContact(user, idDelete))
                            handleClick()
                            handleClose()
                        }}
                    >
                        Từ chối
                    </Button>
                    <Button style={{ fontSize: 10, backgroundColor: '#C67732 ', color: 'white' }} onClick={handleClose} color="primary" autoFocus>
                        Hủy
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

                message="Đã từ chối lời đề nghị kết bạn"
            />
            <Snackbar
                open={openToast1}
                autoHideDuration={2000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                onClose={handleCloseToast1}

                message="Các bạn đã trở thành bạn bè"
            />
        </div >
    );
}
