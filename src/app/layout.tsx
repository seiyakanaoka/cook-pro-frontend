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
            {snackbarEvents.map((snackbarText, i) => (
              <div key={i} className={style['snackbar']}>
                <Snackbar
                  text={snackbarText}
                  onClick={() => deleteSnackbar(i)}
                />
              </div>
            ))}
          </div>
        </SnackbarContext.Provider>
      </body>
    </html>
  );
}
