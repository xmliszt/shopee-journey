import * as React from 'react';

import consts from 'consts';

import { get } from 'libraries/utils/fetch';

function UserCartItems() {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await get(`${consts.API_URL}user/get_cart_items`);
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
        Loading User Cart Items...
        <br />
      </>
    );
  }

  return (
    <div>
      <h3>User Cart Items</h3>
      {items.length ? (
        <ul>
          {(items || []).map((item, index) => {
            return (
              <li key={index}>
                {item.name} - {item.rating}
              </li>
            );
          })}
        </ul>
      ) : (
        'No item in cart!'
      )}
    </div>
  );
}

export default UserCartItems;
