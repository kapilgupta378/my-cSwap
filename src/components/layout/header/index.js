import React, { use, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Button from "../../common/button";
import Link from "next/link";
import Image from "next/image";
import logoIcon from "../../../../public/assets/images/cSwap LIGHT.svg";
import { useRouter } from "next/router";
import { comdex, envConfig } from "@/src/services/config";
import { initializeChain } from "@/src/services/wallet";
const Header = () => {
  const [accountAddress, setAccountAddress] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    try {
      const offlineSigner = window.getOfflineSigner(comdex?.chainId);
      const accounts = await offlineSigner.getAccounts();
      setAccountAddress(accounts[0].address);
    } catch (error) {}
  }

  async function connectWallet() {
    try {
      const { keplr } = window;
      if (!keplr) return alert("Please install wallet extension");
      await keplr.enable(envConfig.chainId);
      const offlineSigner = window.getOfflineSigner(comdex?.chainId);
      const accounts = await offlineSigner.getAccounts();
      setAccountAddress(accounts[0].address);
    } catch (error) {
      initializeChain(getWallet);
    }
  }

  function getWallet(error, account) {
    if (error) {
      alert(error);
      return;
    }
    localStorage.setItem("address", account.address);
    setAccountAddress(account.address);
  }

  function disconnectWallet() {
    setAccountAddress("");
    localStorage.setItem("address", "");
  }
  return (
    <div className={styles.header_wrap}>
      <div>
        <Image src={logoIcon} width={80} height={30} alt="logo" />
      </div>
      <div className={styles.route_wrap}>
        <Link
          style={{ color: router.pathname === "/" ? "#73aed2" : "" }}
          className={styles.route_link}
          href={"/"}
        >
          Overview
        </Link>

        <Link
          style={{ color: router.pathname === "/pools" ? "#73aed2" : "" }}
          className={styles.route_link}
          href={"/pools"}
        >
          Pools
        </Link>
        <Link
          style={{ color: router.pathname === "/tokens" ? "#73aed2" : "" }}
          className={styles.route_link}
          href={"/tokens"}
        >
          Tokens
        </Link>
      </div>
      <div>
        <Button
          onClick={() =>
            accountAddress ? disconnectWallet() : connectWallet()
          }
        >
          {accountAddress ? "Disconnect" : "Connect"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
