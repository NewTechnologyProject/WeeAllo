import { Fragment } from "react";
import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <Fragment>
      <div className={classes.overlay}></div>
      <div className={classes.loading}>
        <div className={classes["lds-ring"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Spinner;
