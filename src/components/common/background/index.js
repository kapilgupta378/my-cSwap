import React from "react";
import styles from "./styles.module.scss";
const Background = ({ children, ...rest }) => {
  return (
    <div {...rest} className={styles.bg_wrap}>
      {children}
    </div>
  );
};

export default Background;
