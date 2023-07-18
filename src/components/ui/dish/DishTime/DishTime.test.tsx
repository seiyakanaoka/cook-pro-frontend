import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { HOUR_MINUTES } from '@/constants/date';
import { formatDate } from '@/utils/date';

import { DishTime } from './DishTime';

describe('DishTimeコンポーネント', () => {
  test('propsで渡したtimeが「HH:mm」形式で表示されていること', () => {
    const time = new Date();
    render(<DishTime time={time} />);
    const element = screen.getByText(formatDate(time, HOUR_MINUTES));
    expect(element).toBeInTheDocument();
  });
});
