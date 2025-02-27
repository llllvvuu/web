import { ValidatorInfoResponse } from '@buf/penumbra-zone_penumbra.bufbuild_es/penumbra/core/component/stake/v1/stake_pb';
import { createGetter } from './utils/create-getter';

export const getValidatorInfo = createGetter(
  (validatorInfoResponse?: ValidatorInfoResponse) => validatorInfoResponse?.validatorInfo,
);
