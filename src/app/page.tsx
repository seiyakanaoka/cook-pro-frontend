import type { NextPage } from 'next';

import { DishTime } from '@/components/ui/dish/DishTime';

const Home: NextPage = () => {
  return (
    <div>
      home
      <br />
      <DishTime time="10:00" />
    </div>
  );
};

export default Home;
