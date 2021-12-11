import React from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
export default function Notifycation(props) {
  const { notify, setNotify } = props;
  const handleClose = (event, reason) => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };
  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={7000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      bodyStyle={{ maxWidth: "100%", height: "auto" }}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
