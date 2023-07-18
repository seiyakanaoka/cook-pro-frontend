import type { NextPage } from 'next';

import { DishTime } from '@/components/ui/dish/DishTime';

const Home: NextPage = () => {
  return (
    <div>
      home
      <br />
      <DishTime time={new Date()} />
    </div>
  );
};

export default Home;
