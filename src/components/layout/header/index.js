import React from "react";
import styles from "./styles.module.scss";
import Button from "../../common/button";
import Link from "next/link";
import Image from "next/image";
import logoIcon from "../../../../public/assets/images/cSwap LIGHT.svg";
const Header = () => {
  return (
    <div className={styles.header_wrap}>
      <div>
        <Image src={logoIcon} width={80} height={30} alt="logo" />
      </div>
      <div className={styles.route_wrap}>
        <Link className={styles.route_link} href={"/"}>
          Overview
        </Link>
        <Link className={styles.route_link} href={"/pools"}>
          Pools
        </Link>
        <Link className={styles.route_link} href={"/tokens"}>
          Tokens
        </Link>
      </div>
      <div>
        <Button>connect</Button>
      </div>
    </div>
  );
};

export default Header;
