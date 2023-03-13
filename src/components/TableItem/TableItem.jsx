import { Rating } from '@mui/material';
import styles from './TableItem.module.scss';

export const TableItem = ({ data: { downloadTime, idRegion, latency, rating, video } }) => {
  return (
    <li className={styles.item}>
      <div className={styles.firstWrapper}>
        <div>{idRegion}</div>
        <div className={styles.rating}>
          <Rating readOnly size="small" value={rating} />
        </div>
      </div>
      <div className={styles.secondWrapper}>
        <div>
          <span>Latency</span>
          <span>{latency}</span>
        </div>
        <div>
          <span>Download time</span>
          <span>{downloadTime} sec</span>
        </div>
        <div>
          <span>Video streaming</span>
          <span>{video}</span>
        </div>
      </div>
    </li>
  );
};
