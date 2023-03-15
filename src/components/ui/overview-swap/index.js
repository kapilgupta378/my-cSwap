import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";
import logoIcon from "../../../../public/assets/images/cSwap LIGHT.svg";
import Background from "../../common/background";
import InfoBox from "../../common/info-box";

const OverViewSwap = ({ data }) => {
  return (
    <div className={styles.overview_wrap}>
      <h3 className={styles.heading}>Overview - cSwap</h3>
      <Background className={styles.wrapper}>
        <Image src={logoIcon} width={80} height={30} alt="logo" />
        <div className={styles.infos_wrap}>
          {data.length !== 0 ? (
            <>
              <InfoBox
                heading={"total value locked"}
                info={`$${data?.total_value_locked?.toFixed(2)}`}
                lastChange={data?.total_value_locked_24h_change?.toFixed(2)}
              />
              <InfoBox
                heading={"24 Hrs volume"}
                info={`$${data?.voume_24h?.toFixed(2)}`}
                lastChange={""}
              />
              <InfoBox
                heading={"CMDX Price"}
                info={`$${data?.price?.toFixed(2)}`}
                lastChange={""}
              />
              <InfoBox
                heading={"24 hrs volume change"}
                info={`$${data?.volume_24h_change?.toFixed(2)}`}
                lastChange={""}
              />
              <InfoBox
                heading={"Interchain Transfers"}
                info={data?.intechain_transfers_24h}
                lastChange={""}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </Background>
    </div>
  );
};

export default OverViewSwap;
