export const pop = () =>
  new Promise((resolve) => {
    window.bridgeCallHandler('pop', {}, ({ error, errorMessage }) => {
      resolve({ error, errorMessage });
    });
  });
