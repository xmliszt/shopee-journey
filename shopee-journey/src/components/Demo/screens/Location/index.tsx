import * as React from 'react';

import Bridge from 'libraries/bridges';
import Button from '../../components/Button';

import styles from './styles.scss';

function Location() {
  const [currentLocation, setCurrentLocation] = React.useState({
    latitude: 0.0,
    longitude: 0.0,
  });

  return (
    <>
      <h1 className={styles.title}>Location</h1>
      <p className={styles.description}>
        {`These are examples of utilizing web bridge to get the real coordinate of user's location.`}
        {`\nThis will only work in smartphone`}
      </p>
      <div>
        Current location: {currentLocation.latitude || '-'},{' '}
        {currentLocation.longitude || '-'}
      </div>
      <br />
      <div>
        <Button
          onClick={async () => {
            const { latitude, longitude } = await Bridge.getCurrentLocation();
            setCurrentLocation({ latitude, longitude });
          }}
        >
          Get Location
        </Button>
      </div>
    </>
  );
}

export default Location;
