import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { FormTitle } from './FormTitle';

describe('FormTitleコンポーネント', () => {
  test('propsで渡したtitleが表示されていること', () => {
    const title = 'hello world';
    render(<FormTitle title={title} />);
    const element = screen.getByText(title);
    expect(element).toBeInTheDocument();
  });
});
