import {
  BackIcon,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FadeTransition,
} from '@penumbra-zone/ui';
import { cn } from '@penumbra-zone/ui/lib/utils';
import { useStore } from '../../../state';
import { importSelector } from '../../../state/seed-phrase/import';
import { usePageNav } from '../../../utils/navigate';
import { PagePath } from '../paths';
import { ImportForm } from '../../../shared';
import { FormEvent, MouseEvent } from 'react';

export const ImportSeedPhrase = () => {
  const navigate = usePageNav();
  const { phrase, phraseIsValid } = useStore(importSelector);

  const handleSubmit = (event: MouseEvent | FormEvent) => {
    event.preventDefault();
    navigate(PagePath.SET_PASSWORD);
  };

  return (
    <FadeTransition>
      <BackIcon className='float-left mb-4' onClick={() => navigate(-1)} />
      <Card className={cn('p-6', phrase.length === 12 ? 'w-[600px]' : 'w-[816px]')} gradient>
        <CardHeader className='items-center'>
          <CardTitle className='font-semibold'>Import wallet with recovery phrase</CardTitle>
          <CardDescription>
            Feel free to paste it into the first box and the rest will fill
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='mt-6 grid gap-4' onSubmit={handleSubmit}>
            <ImportForm />
            <Button
              className='mt-4'
              variant='gradient'
              disabled={!phrase.every(w => w.length > 0) || !phraseIsValid()}
              onClick={handleSubmit}
            >
              {!phrase.length || !phrase.every(w => w.length > 0)
                ? 'Fill in passphrase'
                : !phraseIsValid()
                  ? 'Phrase is invalid'
                  : 'Import'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </FadeTransition>
  );
};
