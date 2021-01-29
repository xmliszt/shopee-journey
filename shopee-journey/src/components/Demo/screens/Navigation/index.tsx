import * as React from 'react';

import {
  LinkBack,
  LinkToProduct,
  LinkToShop,
  LinkToSearch,
  LinkToCart,
  LinkToApp,
} from 'libraries/components/Link';

import IconLink from './link.svg';

import styles from './styles.scss';

function Navigation() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Navigation</h1>
      <p className={styles.description}>
        {`These are examples of navigation using component libraries provided inside libraries/components/Link`}
        {`\nIt is recommended to use these components to navigate around. Under the hood `}
        {`these components will handle smoothly the redirection between web pages, mobile app screen, and web page <-> mobile app screen`}
      </p>
      <div className={styles.linkContainer}>
        <IconLink className={styles.iconLink} />
        <LinkBack>Back</LinkBack>
      </div>
      <div className={styles.linkContainer}>
        <IconLink className={styles.iconLink} />
        <LinkToProduct shopid={91799978} itemid={6113952055}>
          Link to Product
        </LinkToProduct>
      </div>
      <div className={styles.linkContainer}>
        <IconLink className={styles.iconLink} />
        <LinkToShop shopid={91799978}>Link to Shop</LinkToShop>
      </div>
      <div className={styles.linkContainer}>
        <IconLink className={styles.iconLink} />
        <LinkToSearch query='s mart'>Link to Search</LinkToSearch>
      </div>
      <div className={styles.linkContainer}>
        <IconLink className={styles.iconLink} />
        <LinkToCart>Link to Cart</LinkToCart>
      </div>
      <div className={styles.linkContainer}>
        <IconLink className={styles.iconLink} />
        <LinkToApp url='sms://'>Link to App</LinkToApp>
      </div>
    </div>
  );
}

export default Navigation;
