import { Story, Meta } from '@storybook/react';
import Example, { ExampleProps } from './Example';

export default {
  component: Example,
  title: 'Example'
} as Meta;

const Template: Story<ExampleProps> = (args) => <Example {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Test'
};
