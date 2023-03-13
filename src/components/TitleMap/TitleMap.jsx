import styles from './TitleMap.module.scss';

export const TitleMap = ({
  step,
  setStep,
  setMenImageData,
  menImageData,
  clearStates,
  circles,
}) => {
  if (step === 0) {
    return (
      <h1 className={styles.title}>
        Where are your users? Choose the number for every region.
        {menImageData.length < 5 && (
          <button
            className={styles.button}
            onClick={() => {
              setStep(1);
              setMenImageData([]);
            }}
          >
            Next
          </button>
        )}
      </h1>
    );
  }

  if (step === 1) {
    return (
      <h1 className={styles.title}>
        Where is your data? Choose one spot for Object Storage system.
      </h1>
    );
  }

  if (step === 2) {
    return (
      <h1 className={styles.title}>
        Choose minimum two additional spots for ByteCloud and press
        {menImageData.length < 5 && (
          <button
            className={styles.button}
            onClick={() => {
              if (circles.length === 1) {
                setStep(3);
              }
            }}
            disabled={circles.length !== 1}
          >
            Start
          </button>
        )}
      </h1>
    );
  }

  if (step === 5) {
    return (
      <h1 className={styles.title}>
        Do you want to
        <button className={styles.button} onClick={() => clearStates()}>
          start again?
        </button>
      </h1>
    );
  }
};
