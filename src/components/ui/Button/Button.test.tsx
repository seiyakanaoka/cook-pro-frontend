import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  test('propsで渡したonClickが一度実行されていること', () => {
    const onClick = jest.fn();
    render(<Button text="text" color="primary" onClick={onClick} />);
    const element = screen.getByRole('button');
    userEvent.click(element);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('propsで渡したisDisabledがfalseの場合、ボタンは活性化していて、onClickが一度実行されていること', () => {
    const isDisabled = false;
    const onClick = jest.fn();
    render(
      <Button
        text="text"
        color="primary"
        isDisabled={isDisabled}
        onClick={onClick}
      />
    );
    const element = screen.getByRole('button');
    userEvent.click(element);
    expect(element).toBeEnabled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('propsで渡したisDisabledがtrueの場合、ボタンは非活性で、onClickが一度も実行されないこと', () => {
    const isDisabled = true;
    const onClick = jest.fn();
    render(
      <Button
        text="text"
        color="primary"
        isDisabled={isDisabled}
        onClick={onClick}
      />
    );
    const element = screen.getByRole('button');
    userEvent.click(element);
    expect(element).toBeDisabled();
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
