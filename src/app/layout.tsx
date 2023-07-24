'use client';

import '../assets/styles/globals.css';
import { useState } from 'react';

import { Snackbar } from '@/components/ui/SnackBar';
import { SnackbarContext } from '@/context/snackbarContext';

import style from './layout.module.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [snackbarEvents, setSnackbarEvents] = useState<string[]>([]);

  const deleteSnackbar = (snackbarIndex: number) => {
    setSnackbarEvents(
      snackbarEvents.filter((_, index) => index !== snackbarIndex)
    );
  };

  return (
    <html lang="ja">
      <body>
        <SnackbarContext.Provider
          value={{
            snackbarEvents: snackbarEvents,
            setSnackbarEvents: setSnackbarEvents,
          }}
        >
          <div className={style['page-content']}>
            {children}
            <ul className={style['field']}>
              {snackbarEvents.map((snackbarText, i) => (
                <li key={i} className={style['snackbar']}>
                  <Snackbar
                    text={`${snackbarText} ${i}`}
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
