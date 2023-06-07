import React from 'react';

import { Container } from './styles';

export interface ExampleProps {
  text: string;
}

const Example: React.FC<ExampleProps> = ({ text }) => {
  return <Container data-testid="example">{text}</Container>;
};

export default Example;
