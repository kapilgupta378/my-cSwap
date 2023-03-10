import Loading from "@/src/components/common/loading";
import LiquidityChart from "@/src/components/ui/liquidity-chart";
import OverViewPool from "@/src/components/ui/overview-pool";
import OverViewSwap from "@/src/components/ui/OverViewSWap";
import VolumeChart from "@/src/components/ui/volume-chart";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const PoolDetail = () => {
  const router = useRouter();
  const { id, data } = router.query;
  const [overviewData, setOverviewData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    if (id && data) fetchOverviewData();
  }, [id, data]);

  const fetchOverviewData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://stat.comdex.one/api/v2/cswap/pairs/${id}`
      );
      setOverviewData(res.data.data);
      await fetchHistoryData();
      setLoading(false);
    } catch (error) {}
  };
  const fetchHistoryData = async () => {
    try {
      const res = await axios.get(
        `https://stat.comdex.one/api/v2/cswap/pair/history/${data.replace(
          "/",
          "-"
        )}/600`
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
      <OverViewPool data={overviewData} />
      <div className={styles.chart_wrap}>
        <h2>CMDX - Volume & Liquidity</h2>
        <div className={styles.charts}>
          {historyData.length != 0 && (
            <>
              <LiquidityChart
                data={historyData}
                YAxisDataKey={"liquidity"}
                areaDataKey={"liquidity"}
                liquidity={overviewData.total_liquidity.toFixed(2)}
              />
              <VolumeChart
                data={historyData.slice(0, 30)}
                barDataKey={"volume_24h"}
                volume={overviewData.total_volume_24h.toFixed(2)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoolDetail;
