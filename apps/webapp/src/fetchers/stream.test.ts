import { beforeEach, describe, expect, test } from 'vitest';
import { streamToPromise } from './stream';

describe('streamToPromise()', () => {
  describe('when one of the streamed items throws', () => {
    let error: unknown;
    const query = async function* () {
      yield* [
        await new Promise(() => {
          throw error;
        }),
      ];
    };

    describe('when the thrown value is an instance of `Error`', () => {
      beforeEach(() => {
        error = new Error('oops');
      });

      test('rejects with the error', async () => {
        await expect(streamToPromise(query())).rejects.toThrow(error as Error);
      });
    });

    describe('when the thrown value is a string', () => {
      beforeEach(() => {
        error = 'oops';
      });

      test('rejects with the string wrapped in an instance of `Error`', async () => {
        await expect(streamToPromise(query())).rejects.toThrow(new Error('oops'));
      });
    });

    describe('when the thrown value is neither an `Error` instance nor a string', () => {
      beforeEach(() => {
        error = 1n;
      });

      test('rejects with an unknown error', async () => {
        await expect(streamToPromise(query())).rejects.toThrow(
          new Error('Unknown error in `streamToPromise`'),
        );
      });
    });
  });
});
