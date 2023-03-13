import { useEffect } from 'react';
import { TableItem } from '../TableItem/TableItem';
import { uniqueAndNormalizeData } from '../../helpers/functions/uniqueAndNormalizeData';

import styles from './ModalResult.module.scss';

export const ModalResult = ({ downloadBC, downloadUserDC }) => {
  useEffect(() => {
    document.body.classList.add('blurImg');

    return () => {
      document.body.classList.remove('blurImg');
    };
  }, []);

  const normalizeDownloadBC = uniqueAndNormalizeData(downloadBC);
  const normalizeDownloadUserDC = uniqueAndNormalizeData(downloadUserDC);

  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.modal}>
        <div>
          <h2 className={styles.title}>ByteCloud</h2>
          <ul className={styles.list}>
            {normalizeDownloadBC.map((el, i) => (
              <TableItem key={i} data={el} />
            ))}
          </ul>
        </div>
        <div>
          <h2 className={styles.title}>Object Storage</h2>
          <ul className={styles.list}>
            {normalizeDownloadUserDC.map((el, i) => (
              <TableItem key={i} data={el} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
