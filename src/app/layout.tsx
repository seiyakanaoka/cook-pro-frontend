'use client';

import '../assets/styles/globals.css';
import { useCallback, useEffect, useState } from 'react';

import { Snackbar } from '@/components/ui/SnackBar';
import { SnackbarContext } from '@/context/snackbarContext';

import style from './layout.module.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [snackbarEvents, setSnackbarEvents] = useState<string[]>([]);

  const addSnackbar = async (text: string) => {
    setSnackbarEvents(snackbarEvents.concat([text]));
  };

  const deleteSnackbar = useCallback(
    (snackbarIndex: number) => {
      const news = snackbarEvents.filter((_, index) => index !== snackbarIndex);
      setSnackbarEvents(news);
    },
    [snackbarEvents]
  );

  useEffect(() => {
    if (snackbarEvents.length === 0) return;
    const timer = setTimeout(() => deleteSnackbar(0), 5000);
    // clearTimeoutを実行せずにスナックバーを複数表示した場合、setTimeoutを実行した瞬間のsnackbarEventsの状態を保持してしまい、おかしい挙動になる
    // clearTimeoutを行うことで、最後に実行されたsetTimeoutでは最新のsnackbarEventsを保持しているため、挙動がおかしくならない
    return () => clearTimeout(timer);
  }, [deleteSnackbar, snackbarEvents]);

  return (
    <html lang="ja">
      <body>
        <SnackbarContext.Provider
          value={{
            snackbarEvents,
            addSnackbar,
          }}
        >
          <div className={style['page-content']}>
            {children}
            <ul className={style['field']}>
              {snackbarEvents.map((snackbarText, i) => (
                <li key={i} className={style['snackbar']}>
                  <Snackbar
                    text={snackbarText}
                    onClick={() => deleteSnackbar(i)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </SnackbarContext.Provider>
      </body>
    </html>
  );
}
