import * as React from 'react';

import Item from './Item';
import Shop from './Shop';
import User from './User';

import styles from './styles.scss';

function WebEvent() {
  return (
    <>
      <h1 className={styles.title}>API Fetch</h1>
      <p className={styles.description}>
        {`The following are various examples of API Fetching to Shopee API that are available`}
      </p>
      <Item />
      <Shop />
      <User />
    </>
  );
}

export default WebEvent;
