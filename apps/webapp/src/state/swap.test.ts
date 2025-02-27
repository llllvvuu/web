import { create, StoreApi, UseBoundStore } from 'zustand';
import { AllSlices, initializeStore } from '.';
import { beforeEach, describe, expect, test } from 'vitest';
import { AssetBalance } from '../fetchers/balances';
import {
  Metadata,
  ValueView,
} from '@buf/penumbra-zone_penumbra.bufbuild_es/penumbra/core/asset/v1/asset_pb';
import { Amount } from '@buf/penumbra-zone_penumbra.bufbuild_es/penumbra/core/num/v1/num_pb';
import { bech32ToUint8Array } from '@penumbra-zone/types';
import { localAssets } from '@penumbra-zone/constants';
import { AddressView } from '@buf/penumbra-zone_penumbra.bufbuild_es/penumbra/core/keys/v1/keys_pb';

describe('Swap Slice', () => {
  const selectionExample = {
    value: new ValueView({
      valueView: {
        case: 'knownAssetId',
        value: {
          amount: new Amount({
            lo: 0n,
            hi: 0n,
          }),
          metadata: new Metadata({ display: 'test_usd', denomUnits: [{ exponent: 18 }] }),
        },
      },
    }),
    address: new AddressView({
      addressView: {
        case: 'opaque',
        value: {
          address: {
            inner: bech32ToUint8Array(
              'penumbra1e8k5cyds484dxvapeamwveh5khqv4jsvyvaf5wwxaaccgfghm229qw03pcar3ryy8smptevstycch0qk3uu0rgkvtjpxy3cu3rjd0agawqtlz6erev28a6sg69u7cxy0t02nd4',
            ),
          },
        },
      },
    }),
    usdcValue: 0,
  } satisfies AssetBalance;

  let useStore: UseBoundStore<StoreApi<AllSlices>>;

  beforeEach(() => {
    useStore = create<AllSlices>()(initializeStore()) as UseBoundStore<StoreApi<AllSlices>>;
  });

  test('the default is empty, false or undefined', () => {
    expect(useStore.getState().swap.assetIn).toBeUndefined();
    expect(useStore.getState().swap.amount).toBe('');
    expect(useStore.getState().swap.assetOut).toBeUndefined();
    expect(useStore.getState().swap.txInProgress).toBeFalsy();
  });

  test('assetIn can be set', () => {
    expect(useStore.getState().swap.assetIn).toBeUndefined();
    useStore.getState().swap.setAssetIn(selectionExample);
    expect(useStore.getState().swap.assetIn).toBe(selectionExample);
  });

  test('assetOut can be set', () => {
    expect(useStore.getState().swap.assetOut).toBeUndefined();
    useStore.getState().swap.setAssetOut(localAssets[0]!);
    expect(useStore.getState().swap.assetOut).toBe(localAssets[0]);
  });

  test('amount can be set', () => {
    expect(useStore.getState().swap.amount).toBe('');
    useStore.getState().swap.setAmount('22.44');
    expect(useStore.getState().swap.amount).toBe('22.44');
  });

  test('changing assetIn clears simulation', () => {
    expect(useStore.getState().swap.simulateOutResult).toBeUndefined();
    useStore.setState(state => {
      state.swap.simulateOutResult = new ValueView();
      return state;
    });
    expect(useStore.getState().swap.simulateOutResult).toBeDefined();
    useStore.getState().swap.setAssetIn({} as AssetBalance);
    expect(useStore.getState().swap.simulateOutResult).toBeUndefined();
  });

  test('changing assetOut clears simulation', () => {
    expect(useStore.getState().swap.simulateOutResult).toBeUndefined();
    useStore.setState(state => {
      state.swap.simulateOutResult = new ValueView();
      return state;
    });
    expect(useStore.getState().swap.simulateOutResult).toBeDefined();
    useStore.getState().swap.setAssetOut({} as Metadata);
    expect(useStore.getState().swap.simulateOutResult).toBeUndefined();
  });

  test('changing amount clears simulation', () => {
    expect(useStore.getState().swap.simulateOutResult).toBeUndefined();
    useStore.setState(state => {
      state.swap.simulateOutResult = new ValueView();
      return state;
    });
    expect(useStore.getState().swap.simulateOutResult).toBeDefined();
    useStore.getState().swap.setAmount('123');
    expect(useStore.getState().swap.simulateOutResult).toBeUndefined();
  });
});
