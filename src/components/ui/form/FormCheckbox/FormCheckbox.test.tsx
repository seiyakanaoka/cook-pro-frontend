import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { FormCheckbox } from './FormCheckbox';

describe('FormCheckboxコンポーネント', () => {
  test('propsで渡したtextが表示されていること', () => {
    const text = 'Hello World';
    render(<FormCheckbox isCheck={false} text={text} onClick={() => {}} />);
    const element = screen.getByText(text);
    expect(element).toBeInTheDocument();
  });
});
