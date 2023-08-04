import {
  FC,
  ReactNode,
  createRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Snackbar } from '@/components/ui/Snackbar';
import { SNACKBAR_STATUS, SnackbarStatus } from '@/constants/snackbar';
import { SnackbarContext, SnackbarEvent } from '@/context/snackbarContext';

import style from './SnackbarWrapper.module.scss';

type Props = {
  children: ReactNode;
};

export const SnackbarWrapper: FC<Props> = ({ children }: Props) => {
  const [snackbarEvents, setSnackbarEvents] = useState<SnackbarEvent[]>([]);

  const addSnackbar = (text: string, status?: SnackbarStatus) => {
    const newSnackbarEvents = snackbarEvents.concat([
      {
        id: crypto.randomUUID(),
        text,
        status: status ?? SNACKBAR_STATUS.NORMAL,
        ref: createRef<HTMLDivElement>(),
      },
    ]);
    setSnackbarEvents(newSnackbarEvents);
  };

  const deleteSnackbar = useCallback(
    (snackbarIndex: number) => {
      const news = snackbarEvents.filter((_, index) => index !== snackbarIndex);
      setSnackbarEvents(news);
    },
    [setSnackbarEvents, snackbarEvents]
  );

  useEffect(() => {
    if (snackbarEvents.length === 0) return;
    const timer = setTimeout(() => deleteSnackbar(0), 5000);
    // clearTimeoutを実行せずにスナックバーを複数表示した場合、setTimeoutを実行した瞬間のsnackbarEventsの状態を保持してしまい、おかしい挙動になる
    // clearTimeoutを行うことで、最後に実行されたsetTimeoutでは最新のsnackbarEventsを保持しているため、挙動がおかしくならない
    return () => clearTimeout(timer);
  }, [deleteSnackbar, snackbarEvents]);

  return (
    <SnackbarContext.Provider
      value={{
        snackbarEvents,
        addSnackbar,
      }}
    >
      <div className={style['page-content']}>
        {children}
        <TransitionGroup className={style['field']}>
          {snackbarEvents.map((snackbar, i) => (
            <CSSTransition
              key={snackbar.id}
              nodeRef={snackbar.ref}
              timeout={300}
              classNames={{
                enter: style['snackbar-enter'],
                enterActive: style['snackbar-active-enter'],
                exit: style['snackbar-exit'],
                exitActive: style['snackbar-active-exit'],
              }}
            >
              <div className={style['snackbar']} ref={snackbar.ref}>
                <Snackbar
                  text={snackbar.text}
                  status={snackbar.status}
                  onClick={() => deleteSnackbar(i)}
                />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </SnackbarContext.Provider>
  );
};
