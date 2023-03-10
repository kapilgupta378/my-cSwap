import Loading from "@/src/components/common/loading";
import Table from "@/src/components/common/table";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
const tableHeader = [
  "token",
  "price",
  "Price(24hr)",
  "Volume(24hr)",
  "Volume(24hr) change",
  "Liquidity",
];
const Tokens = () => {
  const [tokenData, setTokenData] = useState([]);
  const [loading, setLoading] = useState([]);

  const router = useRouter();
  useEffect(() => {
    fetchTokensData();
  }, []);

  const fetchTokensData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://stat.comdex.one/api/v2/cswap/tokens/all"
      );
      // filtering selected value for table
      const filteredData = res.data.data.map((value) => ({
        ["symbol"]: value?.symbol,

        ["price"]: "$" + value?.price.toFixed(2),

        ["price_24h_change"]:
          value?.price_24h_change.toFixed(2) > 0
            ? "+" + value?.price_24h_change.toFixed(2) + "%"
            : value?.price_24h_change.toFixed(2) + "%",

        ["total_volume_24h"]: "$" + value?.total_volume_24h.toFixed(2),

        ["total_volume_24h_change"]:
          value?.total_volume_24h_change.toFixed(2) > 0
            ? "+" + value?.total_volume_24h_change.toFixed(2) + "%"
            : value?.total_volume_24h_change.toFixed(2) + "%",

        ["liquidity"]: "$" + value.liquidity.toFixed(2),

        ["id"]: value?.exponent,
      }));

      setTokenData(filteredData);
      setLoading(false);
    } catch (error) {}
  };
  const gotoToDetailPage = (data) => {
    router.push(`/token-detail/${data.symbol}`);
  };

  if (loading) {
    return (
      <div className={styles.tokens_wrap}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={styles.tokens_wrap}>
      <h2>Tokens</h2>
      <Table
        tableHeader={tableHeader}
        tableData={tokenData}
        onClickDataRow={gotoToDetailPage}
      />
    </div>
  );
};

export default Tokens;
