'use client';

import { Snackbar } from '@/components/ui/SnackBar';

import '../assets/styles/globals.css';
import style from './layout.module.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className={style['page-content']}>
          {children}
          <div className={style['snackbar']}>
            <Snackbar text="test" onClick={() => {}} />
          </div>
        </div>
      </body>
    </html>
  );
}
