import React from "react";
import { useSelector } from "react-redux";

import classes from "./ActionButton.module.css";

const ActionButton = (props) => {
  const ableToCreate = props.chosenMembers.length >= 1;
  return (
    <div className={classes.actions}>
      <button
        type="submit"
        className={ableToCreate ? classes.submit : classes.disable}
        disabled={!ableToCreate}
      >
        Thêm
      </button>
      <button onClick={props.onCloseModal}>Hủy</button>
    </div>
  );
};

export default ActionButton;
