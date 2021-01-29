export const startShake = () =>
  new Promise((resolve) => {
    window.bridgeCallHandler('startShake', {}, ({ error, errorMessage }) => {
      resolve({ error, errorMessage });
    });
  });

export const stopShake = () =>
  new Promise((resolve) => {
    window.bridgeCallHandler('stopShake', {}, ({ error, errorMessage }) => {
      resolve({ error, errorMessage });
    });
  });
