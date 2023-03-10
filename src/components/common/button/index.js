import React from "react";
import styles from "./styles.module.scss";
const Button = ({ children, ...rest }) => {
  return (
    <button {...rest} className={styles.common_btn}>
      {children}
    </button>
  );
};

export default Button;
