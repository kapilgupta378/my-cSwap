import Loading from "@/src/components/common/loading";
import LiquidityChart from "@/src/components/ui/liquidity-chart";
import OverViewSwap from "@/src/components/ui/OverViewSWap";
import VolumeChart from "@/src/components/ui/volume-chart";
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
      const res = await axios.get(
        "https://stat.comdex.one/api/v2/cswap/overview"
      );
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
                data={historyData.slice(0, 30)}
                // YAxisDataKey={"tvl"}
                areaDataKey={"tvl"}
                liquidity={overviewData.total_value_locked.toFixed(2)}
              />
              <VolumeChart
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
