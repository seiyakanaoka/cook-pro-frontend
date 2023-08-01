import { Header } from '@/components/ui/Header';

import style from './layout.module.scss';

export default function HasHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: childrenの量が少ない時はスクロールさせないようにする
  return (
    <div className={style['has-header-layout']}>
      <div className={style['header']}>
        <Header />
      </div>
      <div className={style['main']}>{children}</div>
    </div>
  );
}
