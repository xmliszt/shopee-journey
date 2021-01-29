import * as React from 'react';

import Bridge from 'libraries/bridges';
import Button from '../../components/Button';

import styles from './styles.scss';

function Share() {
  return (
    <>
      <h1 className={styles.title}>Share</h1>
      <p className={styles.description}>
        {`These are examples of utilizing web bridge to use sharing features in smartphones.`}
        {`\nSharing feature will allow you to share image/text to other social media platforms`}
      </p>
      <div>
        <Button
          onClick={() => {
            Bridge.share('Shopee Ultra Hackathon 2021');
          }}
        >
          Share Text
        </Button>
      </div>
      <br />
      <div>
        <Button
          onClick={() => {
            Bridge.share(
              '',
              'https://upload.wikimedia.org/wikipedia/commons/b/b5/Shopee-logo.jpg'
            );
          }}
        >
          Share Image
        </Button>
      </div>
      <br />
      <div>
        <Button
          onClick={() => {
            Bridge.share(
              'Shopee Ultra Hackathon 2021',
              'https://upload.wikimedia.org/wikipedia/commons/b/b5/Shopee-logo.jpg'
            );
          }}
        >
          Share Both Text &amp; Image
        </Button>
      </div>
    </>
  );
}

export default Share;
