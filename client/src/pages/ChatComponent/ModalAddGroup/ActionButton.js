import React from "react";
import { useSelector } from "react-redux";

import classes from "./ActionButton.module.css";

const ActionButton = (props) => {
  const ableToCreate =
    props.chosenMembers.length > 1 && !props.helperText.error;
  return (
    <div className={classes.actions}>
      <button
        type="submit"
        className={ableToCreate ? classes.submit : classes.disable}
        disabled={!ableToCreate}
      >
        Tạo
      </button>
      <button onClick={props.onCloseModal}>Hủy</button>
    </div>
  );
};

export default ActionButton;
