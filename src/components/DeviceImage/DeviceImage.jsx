import { useState, useEffect } from 'react';
import styles from './DeviceImage.module.scss';

const maxWidth = {
  PC: 2.65,
  Tablet: 1.6,
  Mobile: 1.15,
};

export function DeviceImage({ device, latency, onAnimationFinish }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const downloadTime = latency * 10;
  const countFrames = 30;
  const widthScreenDevice = maxWidth[device.alt];

  useEffect(() => {
    if (latency) {
      const interval = setInterval(() => {
        if (progress < widthScreenDevice) {
          setProgress(prev => prev + widthScreenDevice / countFrames);
        }
      }, downloadTime / countFrames);

      if (progress >= widthScreenDevice) {
        setProgress(widthScreenDevice);
        clearInterval(interval);
        setIsLoading(false);
      }

      return () => {
        clearInterval(interval);
      };
    }
  }, [downloadTime, latency, progress, widthScreenDevice]);

  useEffect(() => {
    if (!isLoading) {
      onAnimationFinish(prev => [...prev, { idRegion: device.idRegion, latency, downloadTime }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className={`${styles.deviceBox} ${styles[device.className]}`}>
      <img className={styles.device} src={device.path} alt={device.alt} />

      {latency && (
        <div
          className={`mask ${styles.deviceScreen} ${styles[device.alt]}`}
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
}
