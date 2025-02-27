import { load_proving_key as wasmLoadProvingKey } from '../wasm';
import { provingKeys } from '@penumbra-zone/types/src/proving-keys';

export const loadLocalBinary = async (filename: string) => {
  const response = await fetch(`bin/${filename}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${filename}`);
  }

  return await response.arrayBuffer();
};

export const loadProvingKey = async (
  /** The `snake_case`d name of the proving key to load. */
  keyType: string,
) => {
  const keyEntry = provingKeys.find(entry => entry.keyType === keyType);

  if (keyEntry) {
    const response = await loadLocalBinary(keyEntry.file);
    wasmLoadProvingKey(response, keyType);
  } else {
    throw new Error(`Proving key not found for key type: ${keyType}`);
  }
};
