import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Button } from './Button';

describe('Buttonコンポーネント', () => {
  test('ボタンであること', () => {
    render(<Button text="text" color="primary" onClick={() => {}} />);
    const element = screen.getByRole('button');
    expect(element).toBeInTheDocument();
  });

  test('propsで渡したtextが表示されていること', () => {
    const text = 'hello world';
    render(<Button text={text} color="primary" onClick={() => {}} />);
    const element = screen.getByRole('button');
    expect(element).toHaveTextContent(text);
  });
});
