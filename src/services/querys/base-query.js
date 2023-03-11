import { HttpBatchClient, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { comdex } from "../config";
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";

export const createQueryClient = (callback) => {
  return newQueryClientRPC(comdex?.rpc, callback);
};

export const newQueryClientRPC = (rpc, callback) => {
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
