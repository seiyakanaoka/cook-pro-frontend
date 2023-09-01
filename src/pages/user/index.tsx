// import { ReactElement } from 'react';

// import { DefaultLayout } from '@/components/layout/default/defaultLayout';
// import { HasHeaderLayout } from '@/components/layout/hasHeader';
// import { User } from '@/components/page/User';
import { NotFound } from '@/components/page/NotFound';
import { NextPageWithLayout } from '@/types/BuildIn';

const UserPage: NextPageWithLayout = () => {
  return <NotFound />;
};

// UserPage.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <DefaultLayout>
//       <HasHeaderLayout>{page}</HasHeaderLayout>
//     </DefaultLayout>
//   );
// };

export default UserPage;
