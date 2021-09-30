import { Grid, TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from "react";
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

export default function AllSend() {
    const dispatch = useDispatch();
    const allSend = useSelector(state => state.contact.listSend);
    const user = useSelector(state => state.customer.userAuth);
    const [open, setOpen] = React.useState(false);
    const [sendContact, setSendContact] = useState([])
    const [idDelete, setIdDelete] = useState(0);
    const [openToast, setOpenToast] = React.useState(false);
    const handleClick = () => {
        setOpenToast(true);
    };
    const handleClickOpen = (id) => {
        setOpen(true);
        setIdDelete(id)
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
        dispatch(actions.fetchSendContact(user))
    }, [])
    useEffect(() => {
        setSendContact(allSend)
    }, [allSend])
    console.log(sendContact)
    const genderListSendContact = () => {
        if (!sendContact.length) {
            return (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Search fontSize="large" />
                    <Typography variant="h5">
                        Không tìm thấy lời mời nào đã gửi
                    </Typography>
                </div>
            )
        }
        else {
            return (
                <Grid container style={{ display: 'flex', position: 'inherit' }}>
                    {sendContact.map((record, index) =>
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
                                        color="error"
                                        variant="outlined"
                                        fullWidth
                                        onClick={(ev) => {
                                            handleClickOpen(record.id);
                                        }}
                                    >Hủy Lời Mời</Button>
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
            {genderListSendContact()}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{""}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xóa lời mời kết bạn của người này
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ fontSize: 10, backgroundColor: 'rgb(180, 0, 0)', color: 'white' }}
                        onClick={() => {
                            dispatch(actions.deleteSendContact(user, idDelete));
                            handleClick();
                            handleClose();
                        }}
                        color="primary">
                        Xóa lời mời
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
                message="Đã hủy yêu cầu kết bạn với người này"
            />
        </div >
    );
}
