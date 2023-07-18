import type { NextPage } from 'next';

import { DishItem } from '@/components/ui/dish/DishItem';
import Food1Icon from 'public/food-1.png';

const Home: NextPage = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: '100%',
          height: '100%',
        }}
      >
        <DishItem
          title="季節の野菜たっぷり
のカレー"
          image={Food1Icon.src}
        />
        <DishItem
          title="季節の野菜たっぷり
のカレー"
          image={Food1Icon.src}
        />
      </div>
    </div>
  );
};

export default Home;
