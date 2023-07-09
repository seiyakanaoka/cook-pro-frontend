import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { FormTitle } from './FormTitle';

describe('FormTitleコンポーネント', () => {
  test('propsで渡したtitleが表示されていること', () => {
    const title = 'hello world';
    render(<FormTitle title={title} />);
  });
});
