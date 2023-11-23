import styles from '@/App.module.scss';
import { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useTranslation } from 'react-i18next';

interface IResponse {
  response: () => void;
}
export const MultiPlayerDialog = (prop: IResponse) => {
  const { t } = useTranslation();
  const onClose = () => {
    prop.response();
  };
  const handleClickOutside = (event) => {
    if (event.target.classList.contains(styles.selectNewObjectDialog)) {
      prop.response();
    }
  };
  return (
    <div className={styles.selectNewObjectDialog} onClick={handleClickOutside}>
      <div className={styles.dialog}>
        <div className={styles.title}>Multi Player Setting</div>
        {t('nowDeveloping')}
        <div className={styles.keyInput}>
          <input className={styles.skywayKey} type='text' />
        </div>
      </div>
    </div>
  );
};

/**
 * 新しいオブジェクトの選択ダイアログ表示
 * @returns
 */
export const showMultiPlayerDialog = async () => {
  return new Promise((resolve) => {
    const dialogContainer = document.getElementById('myDialog') as HTMLElement;
    const root = ReactDOM.createRoot(dialogContainer);
    const handleDialogClose = () => {
      root.unmount();
      resolve(null);
    };
    root.render(<MultiPlayerDialog response={handleDialogClose} />);
  });
};
