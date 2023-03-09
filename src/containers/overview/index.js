import OverViewSwap from "@/src/components/ui/OverViewSWap";
import React from "react";
import styles from "./styles.module.scss";

const OverView = () => {
  return (
    <div className={styles.overview_wrap}>
      <OverViewSwap />
    </div>
  );
};

export default OverView;
