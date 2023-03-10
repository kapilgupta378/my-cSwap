const { Bech32Address } = require("@keplr-wallet/cosmos");
const { comdex, cmst, harbor } = require("./config");

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

export const initializeChain = (callback) => {
  (async () => {
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
      const versionError = `Please use the recent version of keplr wallet extension`;
      callback(versionError);
    }
  })();
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
