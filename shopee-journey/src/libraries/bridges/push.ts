export const push = (url: string) =>
  new Promise((resolve) => {
    window.bridgeCallHandler('push', { url }, ({ error, errorMessage }) => {
      resolve({ error, errorMessage });
    });
  });
