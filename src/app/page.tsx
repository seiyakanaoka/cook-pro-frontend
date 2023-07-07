import type { NextPage } from 'next';
import React from 'react';

import { FormTitle } from '@/components/ui/form/FormTitle';

const Home: NextPage = () => {
  return (
    <div>
      home
      <FormTitle title="テスト" isRequired />
    </div>
  );
};

export default Home;
