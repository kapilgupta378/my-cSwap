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

export const comdex = {
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
