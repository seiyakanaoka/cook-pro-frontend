import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { CopyRight } from './CopyRight';

describe('CopyRightコンポーネント', () => {
  test('「©️ Cook Pro 2023」という表示であること', () => {
    render(<CopyRight />);
    const element = screen.getByText('©️ Cook Pro 2023');
    expect(element).toBeInTheDocument();
  });
});
