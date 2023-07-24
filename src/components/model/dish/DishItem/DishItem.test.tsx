import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { DishItem } from './DishItem';

describe('Dishコンポーネント', () => {
  test('propsで渡したtitleが表示されていること', () => {
    const title = 'Hello World';
    render(<DishItem image="" title={title} time={'20'} />);
    const element = screen.getByText(title);
    expect(element).toBeInTheDocument();
  });

  test('propsで渡したtimeが「~分」形式で表示されていること', () => {
    const time = '20';
    render(<DishItem image="" title="" time={'20'} />);
    const element = screen.getByText(`${time}分`);
    expect(element).toBeInTheDocument();
  });
});
