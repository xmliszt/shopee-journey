export const openAlbum = () =>
  new Promise((resolve) =>
    window.bridgeCallHandler('album', {}, ({ image, error, errorMessage }) => {
      return resolve({ image, error, errorMessage });
    })
  );
