import { SendTabMap } from './types';
import { PagePath } from '../metadata/paths';
import { EduPanel } from '../shared/edu-panels/content';

export const sendTabsHelper: SendTabMap = {
  [PagePath.SEND]: {
    src: './send-icon.svg',
    label: 'Sending Funds',
    content: EduPanel.SENDING_FUNDS,
  },
  [PagePath.RECEIVE]: {
    src: './receive-icon.svg',
    label: 'Receiving Funds',
    content: EduPanel.RECEIVING_FUNDS,
  },
  [PagePath.IBC]: {
    src: './ibc-gradient.svg',
    label: 'IBC withdraw',
    content: EduPanel.IBC_WITHDRAW,
  },
};

export const sendTabs = [
  { title: 'Send', href: PagePath.SEND, active: true },
  { title: 'Receive', href: PagePath.RECEIVE, active: true },
  { title: 'IBC', href: PagePath.IBC, active: false },
];
