import type { NextPage } from 'next';

import { Header } from '@/components/ui/Header';
import LogoImage from 'public/food-1.png';

const Home: NextPage = () => {
  return (
    <div>
      <Header userImage={LogoImage.src} />
    </div>
  );
};

export default Home;
