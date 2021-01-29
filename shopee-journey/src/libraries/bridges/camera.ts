export const openCamera = () =>
  new Promise((resolve) =>
    window.bridgeCallHandler('camera', {}, ({ image, error, errorMessage }) => {
      return resolve({ image, error, errorMessage });
    })
  );
