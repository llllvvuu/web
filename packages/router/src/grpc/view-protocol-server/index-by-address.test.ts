import { beforeEach, describe, expect, test } from 'vitest';
import { IndexByAddressRequest } from '@buf/penumbra-zone_penumbra.bufbuild_es/penumbra/view/v1/view_pb';
import { ServicesInterface } from '@penumbra-zone/types';
import { createContextValues, createHandlerContext, HandlerContext } from '@connectrpc/connect';
import { ViewService } from '@buf/penumbra-zone_penumbra.connectrpc_es/penumbra/view/v1/view_connect';
import { servicesCtx } from '../../ctx';
import { Address } from '@buf/penumbra-zone_penumbra.bufbuild_es/penumbra/core/keys/v1/keys_pb';
import { indexByAddress } from './index-by-address';
import { getAddressByIndex, getEphemeralByIndex } from '@penumbra-zone/wasm';

describe('IndexByAddress request handler', () => {
  let mockServices: ServicesInterface;
  let mockCtx: HandlerContext;
  let testAddress: Address;
  const testFVK =
    'penumbrafullviewingkey1vzfytwlvq067g2kz095vn7sgcft47hga40atrg5zu2crskm6tyyjysm28qg5nth2fqmdf5n0q530jreumjlsrcxjwtfv6zdmfpe5kqsa5lg09';

  beforeEach(() => {
    mockServices = {
      getWalletServices: () =>
        Promise.resolve({
          viewServer: {
            fullViewingKey: testFVK,
          },
        }),
    } as ServicesInterface;

    mockCtx = createHandlerContext({
      service: ViewService,
      method: ViewService.methods.indexByAddress,
      protocolName: 'mock',
      requestMethod: 'MOCK',
      contextValues: createContextValues().set(servicesCtx, mockServices),
    });

    testAddress = getAddressByIndex(testFVK, 0);
  });

  test('should successfully get index for a given address', async () => {
    const addressByIndexResponse = await indexByAddress(
      new IndexByAddressRequest({ address: testAddress }),
      mockCtx,
    );
    expect(addressByIndexResponse.addressIndex?.account === 0).toBeTruthy();
  });

  test('should successfully get index for ephemeral address', async () => {
    testAddress = getEphemeralByIndex(testFVK, 2);

    const addressByIndexResponse = await indexByAddress(
      new IndexByAddressRequest({ address: testAddress }),
      mockCtx,
    );
    expect(addressByIndexResponse.addressIndex?.account === 2).toBeTruthy();
  });

  test('should return empty index for address that is associated with another FVK', async () => {
    const anotherFVK =
      'penumbrafullviewingkey1f33fr3zrquh869s3h8d0pjx4fpa9fyut2utw7x5y7xdcxz6z7c8sgf5hslrkpf3mh8d26vufsq8y666chx0x0su06ay3rkwu74zuwqq9w8aza';
    testAddress = getEphemeralByIndex(anotherFVK, 5);

    const addressByIndexResponse = await indexByAddress(
      new IndexByAddressRequest({ address: testAddress }),
      mockCtx,
    );
    expect(addressByIndexResponse.addressIndex).toBeUndefined();
  });
});
