import type { NextPage } from 'next';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const [isOpen] = useState();

  useEffect(() => {
    console.log(isOpen);
  }, []);

  return <div>home</div>;
};

export default Home;
