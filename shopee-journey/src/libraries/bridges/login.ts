export const loginIfNeeded = (callbackUrl: string) =>
  new Promise((resolve) => {
    window.bridgeCallHandler(
      'loginIfNeeded',
      { callbackUrl },
      ({ error, errorMessage }) => {
        return resolve({ error, errorMessage });
      }
    );
  });

export const isUserLoggedIn = () =>
  new Promise((resolve) => {
    window.bridgeCallHandler(
      'isUserLoggedIn',
      {},
      ({ isLoggedIn, error, errorMessage }) => {
        return resolve({ isLoggedIn, error, errorMessage });
      }
    );
  });

export const getHackathonUserToken = () =>
  new Promise((resolve) => {
    window.bridgeCallHandler(
      'getHackathonUserToken',
      {},
      ({ data, error, errorMessage }) => {
        return resolve({ data, error, errorMessage });
      }
    );
  });
