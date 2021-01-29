import * as React from 'react';

import consts from 'consts';

import { getImageUrl } from 'libraries/utils/url';
import { get } from 'libraries/utils/fetch';

import styles from './styles.scss';

function ItemDetail() {
  const [item, setItem] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await get(`${consts.API_URL}item/get_info`, {
        item_id: 1642351377,
        shop_id: 102338025,
      });
      if (isMounted && response) {
        setItem(response.data);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!item) {
    return (
      <>
        Loading Item Data...
        <br />
      </>
    );
  }

  return (
    <div className={styles.itemDetailContainer}>
      <h3>Item Detail</h3>
      <img
        className={styles.itemImage}
        src={getImageUrl(item.cover)}
        width='100'
      />
      <div className={styles.itemName}>{item.name}</div>
      <div>Price: ${item.price}</div>
      <div>Sold: {item.sold}</div>
      <div>Stock: {item.stock}</div>
    </div>
  );
}

export default ItemDetail;
