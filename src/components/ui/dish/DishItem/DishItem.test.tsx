import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { HOUR_MINUTES } from '@/constants/date';
import { formatDate } from '@/utils/date';

import { DishItem } from './DishItem';

describe('Dishコンポーネント', () => {
  test('propsで渡したtitleが表示されていること', () => {
    const title = 'Hello World';
    render(<DishItem image="" title={title} time={new Date()} />);
    const element = screen.getByText(title);
    expect(element).toBeInTheDocument();
  });

  test('propsで渡したtimeが「HH:mm」形式で表示されていること', () => {
    const time = new Date();
    render(<DishItem image="" title="" time={time} />);
    const element = screen.getByText(formatDate(time, HOUR_MINUTES));
    expect(element).toBeInTheDocument();
  });
});
