import type { NextPage } from 'next';

const Home: NextPage = () => {
  const test = [1, 2, 3, 4, 5];

  return (
    <div>
      home
      <div>
        {test.map((aaa) => (
          <div>{aaa}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
