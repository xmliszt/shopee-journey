export const share = (text?: string, imageUrl?: string) =>
  new Promise((resolve) => {
    window.bridgeCallHandler(
      'share',
      { text, imageUrl },
      ({ error, errorMessage }) => {
        resolve({ error, errorMessage });
      }
    );
  });
