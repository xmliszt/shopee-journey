import * as React from 'react';

import Bridge from 'libraries/bridges';
import Button from '../../components/Button';

import styles from './styles.scss';

function Shake() {
  const [shakeActive, setOnShakeActive] = React.useState(false);
  const [shakeCount, setShakeCount] = React.useState(0);

  React.useEffect(() => {
    const addShakeCount = () => {
      setShakeCount((prevShakeCount) => prevShakeCount + 1);
    };

    window.bridgeRegisterHandler('onShake', addShakeCount);
    return () => {
      window.bridgeUnRegisterHandler('onShake');
    };
  }, []);

  return (
    <>
      <h1 className={styles.title}>Shake</h1>
      <p className={styles.description}>
        {`These are examples of utilizing web bridge to detect shaking movement on smartphone.`}
      </p>
      <div>Current shake counter: {shakeCount}</div>
      <br />
      <div>
        {shakeActive ? (
          <Button
            onClick={() => {
              Bridge.stopShake();
              setOnShakeActive(false);
            }}
          >
            Stop shake
          </Button>
        ) : (
          <Button
            onClick={() => {
              Bridge.startShake();
              setOnShakeActive(true);
            }}
          >
            Start shake
          </Button>
        )}
      </div>
    </>
  );
}

export default Shake;
