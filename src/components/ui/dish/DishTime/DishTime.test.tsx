import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { DishTime } from './DishTime';

describe('DishTimeコンポーネント', () => {
  test('propsで渡したtimeが「~分」形式で表示されていること', () => {
    const time = '20';
    render(<DishTime time={time} />);
    const element = screen.getByText(`${time}分`);
    expect(element).toBeInTheDocument();
  });
});
