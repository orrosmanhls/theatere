import React from 'react';
import { render, screen } from '@testing-library/react';

import Example from './Example';

test('Example should render props', () => {
  const text = 'text';
  render(<Example text={text} />);
  expect(screen.getByTestId('example').textContent).toContain(text);
});
