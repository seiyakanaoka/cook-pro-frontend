import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { FormTextField } from './FormTextField';

describe('FormTextFieldコンポーネント', () => {
  test('propsで渡したvalueの値を持っていること', () => {
    const value = 'hello world';
    render(<FormTextField value={value} onChange={() => {}} />);
    const element = screen.getByRole('textbox') as HTMLInputElement;
    expect(element).toHaveValue(value);
  });
});
