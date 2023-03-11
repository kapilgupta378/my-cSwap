import Table from "@/src/components/common/table";
import { queryAllBalances } from "@/src/services/querys/balance-query";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
const tableHeader = ["Asset", "No. of tokens", "Price", "Amount"];
const Portfolio = () => {
  const [accountBalances, setAccountBalances] = useState([]);

  const fetchBalances = (address) => {
    queryAllBalances(address, (error, result) => {
      if (error) {
        console.error(error);

        return;
      }
      setAccountBalances(result.balances, result.pagination);
    });
  };

  useEffect(() => {
    const address = localStorage.getItem("address");
    if (address) fetchBalances(address);
  }, []);

  return (
    <div className={styles.portfolio_wrap}>
      <h2>Tokens</h2>
      <div className={styles.tokens_wrap}>{/* <Table /> */}</div>
    </div>
  );
};

export default Portfolio;
