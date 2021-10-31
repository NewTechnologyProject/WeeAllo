import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const Alert = (props) => {
  const execute = () => {
    props.content.function();
    props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.content.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {"Bạn có thể hủy ngay lúc này"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Hủy
        </Button>
        <Button variant="contained" onClick={execute} color="primary" autoFocus>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
