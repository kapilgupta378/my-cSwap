import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";
import Background from "../../common/background";
import InfoBox from "../../common/info-box";

const OverViewToken = ({ data }) => {
  return (
    <div className={styles.overview_wrap}>
      <h3 className={styles.heading}>Token Overview</h3>
      <Background>
        <div>
          <h2>{data?.symbol}</h2>
          <div className={styles.infos_wrap}>
            {data.length !== 0 ? (
              <>
                <InfoBox
                  heading={"Price"}
                  info={`$${data?.price?.toFixed(2)}`}
                  lastChange={""}
                />
                <InfoBox
                  heading={"Price(24h)"}
                  info={`${
                    data?.price_24h_change?.toFixed(2) > 0
                      ? "+" + data?.price_24h_change?.toFixed(2) + "%"
                      : data?.price_24h_change?.toFixed(2) + "%"
                  }`}
                  lastChange={""}
                />
                <InfoBox
                  heading={"Volume(24h)"}
                  info={`${"$" + data?.total_volume_24h?.toFixed(2)}`}
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
                <InfoBox
                  heading={"Liquidity"}
                  info={`$${data?.liquidity.toFixed(2)}`}
                  lastChange={""}
                />
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

export default OverViewToken;
