import Loading from "@/src/components/common/loading";
import LiquidityChart from "@/src/components/common/liquidity-chart";
import OverViewSwap from "@/src/components/ui/overview-swap";
import VolumeChart from "@/src/components/common/volume-chart";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const OverView = () => {
  const [overviewData, setOverviewData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        "https://stat.comdex.one/api/v2/cswap/overview"
      );
      const resToken = await axios.get(
        "https://stat.comdex.one/api/v2/cswap/tokens/all"
      );
      const CMDXTokenData = resToken.data.data.find(
        (data) => data.symbol === "CMDX"
      );
      res.data.data.price = CMDXTokenData.price;
      setOverviewData(res.data.data);
    } catch (error) {}
    await fetchData();
    setLoading(false);
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://stat.comdex.one/api/v2/cswap/overview/history/600"
      );
      setHistoryData(res.data.data);
    } catch (error) {}
  };

  if (loading) {
    return (
      <div className={styles.overview_wrap}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.overview_wrap}>
      <OverViewSwap data={overviewData} />
      <div className={styles.chart_wrap}>
        <h2>CMDX - Volume & Liquidity</h2>
        <div className={styles.charts}>
          {historyData.length != 0 && (
            <>
              <LiquidityChart
                className={"chart"}
                data={historyData.slice(0, 30)}
                // YAxisDataKey={"tvl"}
                areaDataKey={"tvl"}
                liquidity={overviewData.total_value_locked.toFixed(2)}
              />
              <VolumeChart
                className={"chart"}
                data={historyData.slice(0, 30)}
                barDataKey={"volume_24h"}
                volume={overviewData.volume_24h_change.toFixed(2)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverView;
