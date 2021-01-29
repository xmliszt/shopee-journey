import * as React from 'react';

import Bridge from 'libraries/bridges';
import Button from '../../components/Button';

import { getWebUrl } from 'libraries/utils/url';

import styles from './styles.scss';

function Login() {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  Bridge.isUserLoggedIn().then(({ isLoggedIn }: { isLoggedIn: boolean }) => {
    setIsUserLoggedIn(isLoggedIn);
  });

  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.description}>
        {`These are examples of utilizing the web bridge to easily authenticate user to Shopee`}
      </p>
      <div>Login Status: {isUserLoggedIn ? 'YES' : 'NO'}</div>
      <br />
      <div>
        <Button
          onClick={async () => {
            const { isLoggedIn } = await Bridge.isUserLoggedIn();
            setIsUserLoggedIn(isLoggedIn);
          }}
        >
          Get login status
        </Button>
      </div>
      <br />
      <div>
        <Button
          onClick={() => {
            Bridge.loginIfNeeded(getWebUrl(`${window.location.origin}/login`));
          }}
        >
          Log In
        </Button>
      </div>
    </>
  );
}

export default Login;
