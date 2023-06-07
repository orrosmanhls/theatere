import type { Meta } from '@storybook/react';
import { GlobalErrorProvider } from './GlobalErrorContext';

const Story: Meta<typeof GlobalErrorProvider> = {
  component: GlobalErrorProvider,
  title: 'GlobalErrorProvider'
};
export default Story;

export const Primary = {
  args: {}
};
