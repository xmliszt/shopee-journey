export const getCurrentLocation = () =>
  new Promise((resolve) => {
    window.bridgeCallHandler(
      'getCurrentLocation',
      {},
      ({ latitude, longitude, error, errorMessage }) => {
        return resolve({ latitude, longitude, error, errorMessage });
      }
    );
  });
