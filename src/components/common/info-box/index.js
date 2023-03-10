import React from "react";
import styles from "./styles.module.scss";

const InfoBox = ({ heading, info, lastChange }) => {
  return (
    <div className={styles.info_box_wrap}>
      <p>{heading}</p>
      <div
        style={{
          color: info.toString().includes("+")
            ? "#33df33"
            : info.toString().includes("-")
            ? "red"
            : "",
        }}
      >
        {info}
        {lastChange && (
          <span
            style={{ color: lastChange < 0 ? "red" : "#33df33" }}
            className={styles.up}
          >{` ${lastChange > 0 ? "+" + lastChange : lastChange}%`}</span>
        )}
      </div>
    </div>
  );
};

export default InfoBox;
