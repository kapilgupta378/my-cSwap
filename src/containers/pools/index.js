import Loading from "@/src/components/common/loading";
import Table from "@/src/components/common/table";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
const tableHeader = [
  "Pool",
  "Liquidity",
  "Volume(24hr)",
  "Volume(24hr) change",
  "Liquidity(24hr) change",
];
const Pools = () => {
  const [poolsData, setPoolsData] = useState([]);
  const [loading, setLoading] = useState([]);

  const router = useRouter();
  useEffect(() => {
    fetchPoolsData();
  }, []);

  const fetchPoolsData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://stat.comdex.one/api/v2/cswap/pairs/all"
      );

      // filtering selected value for table
      const filteredData = res.data.data.map((value) => ({
        ["pair_symbol"]: value?.pair_symbol,
        ["total_liquidity"]: "$" + value?.total_liquidity.toFixed(2),
        ["total_volume_24h"]: "$" + value?.total_volume_24h.toFixed(2),
        ["total_volume_24h_change"]:
          value?.total_volume_24h_change.toFixed(2) > 0
            ? "+" + value?.total_volume_24h_change.toFixed(2)
            : value?.total_volume_24h_change.toFixed(2),
        ["total_liquidity_24h_change"]:
          value?.total_liquidity_24h_change.toFixed(2) > 0
            ? "+" + value?.total_liquidity_24h_change.toFixed(2)
            : value?.total_liquidity_24h_change.toFixed(2),
        ["id"]: value?.pair_id,
      }));

      setPoolsData(filteredData);
      setLoading(false);
    } catch (error) {}
  };

  const gotoToDetailPage = (data) => {
    router.push(`/pool-detail/${data.id}?data=${data.pair_symbol}`);
  };

  if (loading) {
    return (
      <div className={styles.pool_wrap}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={styles.pool_wrap}>
      <h2>All Pools</h2>

      <Table
        tableHeader={tableHeader}
        tableData={poolsData}
        onClickDataRow={gotoToDetailPage}
      />
    </div>
  );
};

export default Pools;
