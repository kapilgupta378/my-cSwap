import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });
import Long from "long";
import { QueryClientImpl } from "comdex-codec/build/comdex/asset/v1beta1/query";
import { useCallback, useEffect, useState } from "react";
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { HttpBatchClient, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { Bech32Address } from "@keplr-wallet/cosmos";

import AssetList from "../src/config/ibc_assets.json";
import OverView from "@/src/containers/overview";

export const envConfig = {
  rpc: "https://rpc.comdex.one",
  rest: "https://rest.comdex.one",
  chainId: "Comdex",
  coinDenom: "CMDX",
  coinMinimalDenom: "ucmdx",
  coinDecimals: 6,
  prefix: "comdex",
  coinType: 118,
  chainName: "Comdex Test Chain",
  explorerUrlToTx: "https://dev-explorer.comdex.one/transactions/{txHash}",
  apiUrl: "https://test-stat.comdex.one",
  comdexStakingUrl: "https://comdex.omniflix.co/stake",
  webSocketApiUrl: "wss://devnet.rpc.comdex.one/websocket",
  symbol: "CMDX",

  commodo: {
    appId: 3,
    cswapAppId: 2,
    numberOfTopAssets: 3,
    websiteUrl: "https://devnet.commodo.one",
    cswapUrl: "https://devnet.cswap.one",
    rewardsUrl: "https://docs.commodo.one/rewards",
    atomCmdxPoolId: 1,
  },

  cSwap: {
    appId: 2,
    masterPoolId: 1,
    websiteUrl: "https://devnet.cswap.one",
    networkTag: "Devnet",
  },

  harbor: {
    title: "Harbor Protocol",
    websiteUrl: "https://devnet.harborprotocol.one",
    appId: 1,
    governanceContractAddress:
      "comdex17p9rzwnnfxcjp32un9ug7yhhzgtkhvl9jfksztgw5uh69wac2pgs4jg6dx",
    lockingContractAddress:
      "comdex1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqdfklyz",
    airdropContractAddress:
      "comdex1ghd753shjuwexxywmgs4xz7x2q732vcnkm6h2pyv9s6ah3hylvrqfy9rd8",
    harborAirdropApiUrl: "http://3.7.255.161",
    harborDashboardTVLApiUrl: " https://test-stat.comdex.one",
  },
};

const getIbcDenomsMap = () => {
  let myMap = {};

  for (let i = 0; i < AssetList?.tokens?.length; i++) {
    if (myMap[AssetList?.tokens[i].coinMinimDenom] === undefined) {
      myMap[AssetList?.tokens[i].coinMinimalDenom] =
        AssetList?.tokens[i]?.ibcDenomHash;
    }
  }

  return myMap;
};

export const cmst = {
  coinDenom: "CMST",
  coinMinimalDenom: "ucmst",
  coinDecimals: 6,
  symbol: "CMST",
};

export const harbor = {
  coinDenom: "HARBOR",
  coinMinimalDenom: "uharbor",
  coinDecimals: 6,
  symbol: "HARBOR",
};

export const ibcDenoms = getIbcDenomsMap() || {};

export const tokenCoinGeckoIds = [
  "cosmos",
  "terra-luna",
  "ki",
  "comdex",
  "kava",
  "sentinel",
  "osmosis",
  "juno-network",
  "akash-network",
  "umee",
  "mantle",
  "persistence",
  "chihuahua-token",
  "secret",
  "injective-protocol",
];

const comdex = {
  chainId: envConfig?.chainId,
  chainName: envConfig?.chainName,
  rpc: envConfig?.rpc,
  rest: envConfig?.rest,
  explorerUrlToTx: envConfig?.explorerUrlToTx,
  walletUrlForStaking: envConfig?.walletUrlForStaking,
  coinDenom: envConfig?.coinDenom,
  coinMinimalDenom: envConfig?.coinMinimalDenom,
  coinDecimals: envConfig?.coinDecimals,
  prefix: envConfig?.prefix,
  coinType: envConfig?.coinType,
  symbol: envConfig?.symbol,
  webSocketApiUrl: envConfig?.webSocketApiUrl,
};

const getCurrencies = (chain) => {
  if (chain?.rpc === comdex?.rpc) {
    return [
      {
        coinDenom: chain?.coinDenom,
        coinMinimalDenom: chain?.coinMinimalDenom,
        coinDecimals: chain?.coinDecimals,
      },
      {
        coinDenom: cmst?.coinDenom,
        coinMinimalDenom: cmst?.coinMinimalDenom,
        coinDecimals: cmst?.coinDecimals,
      },
      {
        coinDenom: harbor?.coinDenom,
        coinMinimalDenom: harbor?.coinMinimalDenom,
        coinDecimals: harbor?.coinDecimals,
      },
    ];
  } else {
    return [
      {
        coinDenom: chain?.coinDenom,
        coinMinimalDenom: chain?.coinMinimalDenom,
        coinDecimals: chain?.coinDecimals,
      },
    ];
  }
};

const getChainConfig = (chain = comdex) => {
  return {
    chainId: chain?.chainId,
    chainName: chain?.chainName,
    rpc: chain?.rpc,
    rest: chain?.rest,
    stakeCurrency: {
      coinDenom: chain?.coinDenom,
      coinMinimalDenom: chain?.coinMinimalDenom,
      coinDecimals: chain?.coinDecimals,
    },
    walletUrlForStaking: chain?.walletUrlForStaking,
    bip44: {
      coinType: chain?.coinType,
    },
    bech32Config: Bech32Address.defaultBech32Config(chain?.prefix),
    currencies: getCurrencies(chain),
    feeCurrencies: [
      {
        coinDenom: chain?.coinDenom,
        coinMinimalDenom: chain?.coinMinimalDenom,
        coinDecimals: chain?.coinDecimals,
        coinGeckoId: chain?.coinGeckoId,
        // Adding separate gas steps for eth accounts.
        gasPriceStep: chain?.features?.includes("eth-address-gen")
          ? {
              low: 1000000000000,
              average: 1500000000000,
              high: 2000000000000,
            }
          : {
              low: 0.01,
              average: 0.025,
              high: 0.04,
            },
      },
    ],
    coinType: chain?.coinType,
    features: chain?.features,
  };
};

const initializeChain = (callback) => {
  (async () => {
    let isNoExtensionExists = !window.getOfflineSigner || !window.keplr;

    if (isNoExtensionExists) {
      const error = `Please install wallet extension`;
      callback(error);
    } else {
      if (window.keplr.experimentalSuggestChain) {
        try {
          await window.keplr.experimentalSuggestChain(getChainConfig());
          const offlineSigner = window.getOfflineSigner(comdex?.chainId);
          const accounts = await offlineSigner.getAccounts();

          callback(null, accounts[0]);
        } catch (error) {
          callback(error?.message);
        }
      } else {
        const versionError = `Please use the recent version of ${walletType} wallet extension`;
        callback(versionError);
      }
    }
  })();
};

// const initializeIBCChain = (config, callback) => {
//   (async () => {
//     let walletType = localStorage.getItem("loginType");

//     let isNoExtensionExists =
//       walletType === "keplr"
//         ? !window.getOfflineSigner || !window.keplr
//         : !window?.leap?.getOfflineSigner || !window.wallet;

//     if (isNoExtensionExists) {
//       const error = `Please install ${walletType} wallet extension`;
//       callback(error);
//     } else {
//       let suggestChain =
//         walletType === "keplr"
//           ? window.keplr.experimentalSuggestChain
//           : window.leap.experimentalSuggestChain;

//       if (suggestChain) {
//         try {
//           walletType === "keplr"
//             ? await window.keplr.experimentalSuggestChain(config)
//             : await window.leap.experimentalSuggestChain(config);
//           const offlineSigner =
//             walletType === "keplr"
//               ? window.getOfflineSigner(config?.chainId)
//               : window?.leap?.getOfflineSigner(config?.chainId);
//           const accounts = await offlineSigner.getAccounts();

//           callback(null, accounts[0]);
//         } catch (error) {
//           callback(error?.message);
//         }
//       } else {
//         const versionError = "Please use the recent version of keplr extension";
//         callback(versionError);
//       }
//     }
//   })();
// };

let myClient = null;

export default function Home() {
  const [assets, setAssets] = useState([]);
  const [accountAddress, setAccountAddress] = useState("");
  assets;

  const createQueryClient = (callback) => {
    return newQueryClientRPC(comdex?.rpc, callback);
  };

  const newQueryClientRPC = (rpc, callback) => {
    const httpBatch = new HttpBatchClient(rpc, {
      batchSizeLimit: 50,
      dispatchInterval: 500,
    });

    Tendermint34Client.create(httpBatch)
      .then((tendermintClient) => {
        const queryClient = new QueryClient(tendermintClient);
        const rpcClient = createProtobufRpcClient(queryClient);
        callback(null, rpcClient);
      })
      .catch((error) => {
        callback(error?.message);
      });
  };

  // const getQueryService = (callback) => {
  //   if (myClient) {
  //     const queryService = new QueryClientImpl(myClient);

  //     return callback(null, queryService);
  //   } else {
  //     createQueryClient((error, client) => {
  //       if (error) {
  //         return callback(error);
  //       }
  //       myClient = client;
  //       const queryService = new QueryClientImpl(client);

  //       return callback(null, queryService);
  //     });
  //   }
  // };

  // const queryAssets = (offset, limit, countTotal, reverse, callback) => {
  //   getQueryService((error, queryService) => {
  //     if (error) {
  //       callback(error);
  //       return;
  //     }
  //     debugger;
  //     queryService
  //       .QueryAssets({
  //         pagination: {
  //           key: "",
  //           offset: Long.fromNumber(offset),
  //           limit: Long.fromNumber(limit),
  //           countTotal: countTotal,
  //           reverse: reverse,
  //         },
  //       })
  //       .then((result) => {
  //         callback(null, result);
  //       })
  //       .catch((error) => {
  //         callback(error?.message);
  //       });
  //   });
  // };

  // const fetchAssets = (offset, limit, countTotal, reverse) => {
  //   queryAssets(offset, limit, countTotal, reverse, (error, data) => {
  //     if (error) {
  //       console.error(error);
  //       return;
  //     }
  //     setAssets(data.assets);
  //   });
  // };

  // const getQueryService = (callback) => {
  //   if (myClient) {
  //     const queryService = new QueryClientImpl(myClient);

  //     return callback(null, queryService);
  //   } else {
  //     createQueryClient((error, client) => {
  //       if (error) {
  //         return callback(error);
  //       }

  //       myClient = client;
  //       const queryService = new QueryClientImpl(client);

  //       return callback(null, queryService);
  //     });
  //   }
  // };

  // const queryAllBalances = (owner, callback) => {
  //   getQueryService((error, queryService) => {
  //     if (error) {
  //       callback(error);
  //       return;
  //     }

  //     queryService
  //       .AllBalances({
  //         address: owner,
  //       })
  //       .then((result) => {
  //         callback(null, result);
  //       })
  //       .catch((error) => {
  //         callback(error?.message);
  //       });
  //   });
  // };

  // const fetchBalances = (address) => {
  //   debugger;
  //   queryAllBalances(address, (error, result) => {
  //     if (error) {
  //       console.error(error);

  //       return;
  //     }
  //     setAccountBalances(result.balances, result.pagination);
  //     calculateAssetBalance(result.balances);
  //   });
  // };
  // useEffect(() => {
  //   connect();
  // }, []);
  // useEffect(() => {
  //   if (accountAddress) fetchBalances(accountAddress);
  // }, [accountAddress]);

  // const connect = async () => {
  //   const chainId = comdex.chainId;

  //   // Enabling before using the Keplr is recommended.
  //   // This method will ask the user whether to allow access if they haven't visited this website.
  //   // Also, it will request that the user unlock the wallet if the wallet is locked.
  //   await initializeChain((error, account) => {
  //     if (error) {
  //       console.error(error);
  //       return;
  //     }
  //     debugger;
  //     setAccountAddress(account.address);
  //   });
  //   await window.keplr.enable(chainId);
  //   // fetchAssets(
  //   //   0,
  //   //   100, // taking 100 records
  //   //   true,
  //   //   false
  //   // );
  //   // fetchBalances(accountAddress);
  // };

  return <OverView />;
}
