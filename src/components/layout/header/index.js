import React, { use } from "react";
import styles from "./styles.module.scss";
import Button from "../../common/button";
import Link from "next/link";
import Image from "next/image";
import logoIcon from "../../../../public/assets/images/cSwap LIGHT.svg";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();
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
        <Button>connect</Button>
      </div>
    </div>
  );
};

export default Header;
