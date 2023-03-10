import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";
import Background from "../../common/background";
import InfoBox from "../../common/info-box";

const OverViewPool = ({ data }) => {
  return (
    <div className={styles.overview_wrap}>
      <h3 className={styles.heading}>Pool Overview</h3>
      <Background>
        <div>
          <h2>{data?.pair_symbol?.replace("/", "-")}</h2>
          <div className={styles.infos_wrap}>
            {data.length !== 0 ? (
              <>
                <InfoBox
                  heading={"Liquidity"}
                  info={`$${data?.total_liquidity?.toFixed(2)}`}
                  lastChange={""}
                />
                <InfoBox
                  heading={"Liquidity(24H) volume"}
                  info={`${
                    data?.total_liquidity_24h_change?.toFixed(2) > 0
                      ? "+" + data?.total_liquidity_24h_change?.toFixed(2) + "%"
                      : data?.total_liquidity_24h_change?.toFixed(2) + "%"
                  }`}
                  lastChange={""}
                />
                <InfoBox
                  heading={"Volume(24h)"}
                  info={`$${data?.total_volume_24h?.toFixed(2)}`}
                  lastChange={""}
                />
                <InfoBox
                  heading={"Volume(24h) change"}
                  info={`${
                    data?.total_volume_24h_change?.toFixed(2) > 0
                      ? "+" + data?.total_volume_24h_change?.toFixed(2) + "%"
                      : data?.total_volume_24h_change?.toFixed(2) + "%"
                  }`}
                  lastChange={""}
                />
                <InfoBox heading={"fees"} info={"-"} lastChange={""} />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </Background>
    </div>
  );
};

export default OverViewPool;
