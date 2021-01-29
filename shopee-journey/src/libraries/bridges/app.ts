export const openApp = (url: string) =>
  new Promise((resolve) => {
    window.bridgeCallHandler('openApp', { url }, ({ error, errorMessage }) => {
      resolve({ error, errorMessage });
    });
  });
