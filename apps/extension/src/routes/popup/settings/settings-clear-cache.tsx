import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button, FadeTransition } from '@penumbra-zone/ui';
import { SettingsHeader } from '../../../shared';
import { TrashGradientIcon } from '../../../icons';
import { internalSwClient } from '@penumbra-zone/router';
import { usePopupNav } from '../../../utils/navigate';
import { PopupPath } from '../paths';

export const SettingsClearCache = () => {
  const navigate = usePopupNav();
  return (
    <FadeTransition>
      <div className='flex min-h-[100vh] w-[100vw] flex-col gap-6'>
        <SettingsHeader title='Clear cache' />
        <div className='mx-auto size-20'>
          <TrashGradientIcon />
        </div>
        <div className='flex flex-1 flex-col items-start justify-between px-[30px] pb-5'>
          <div className='flex flex-col items-center gap-2'>
            <p className='font-headline text-base font-semibold'>Are you sure?</p>
            <p className='text-center text-muted-foreground'>
              Do you really want to clear cache? All local data will be deleted and resynchronized.
            </p>
            <p className='mt-2 flex items-center gap-2 font-headline text-base font-semibold text-rust'>
              <ExclamationTriangleIcon className='size-[30px] text-rust' /> You private keys won’t
              be lost!
            </p>
          </div>
          <Button
            variant='gradient'
            size='lg'
            className='w-full'
            onClick={() => {
              void (async () => {
                await internalSwClient.clearCache();
                navigate(PopupPath.INDEX);
              })();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </FadeTransition>
  );
};
