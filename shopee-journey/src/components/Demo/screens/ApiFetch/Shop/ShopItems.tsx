import * as React from 'react';

import consts from 'consts';

import { get } from 'libraries/utils/fetch';

function ShopItems() {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await get(`${consts.API_URL}shop/get_items`, {
        shop_id: 243239155,
        offset: 0,
        limit: 2,
      });
      if (isMounted && response && response.data && response.data.items) {
        setItems(response.data.items);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!items) {
    return (
      <>
        Loading Shop Items...
        <br />
      </>
    );
  }

  return (
    <div>
      <h3>Shop Items</h3>
      <ul>
        {(items || []).map((item, index) => {
          return (
            <li key={index}>
              {item.name} - {item.rating}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ShopItems;
