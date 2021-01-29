import * as React from 'react';

import consts from 'consts';

import { getImageUrl } from 'libraries/utils/url';
import { get } from 'libraries/utils/fetch';

function ShopInfo() {
  const [shop, setShop] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await get(`${consts.API_URL}shop/get_info`, {
        shop_id: 243239155,
      });
      if (isMounted && response) {
        setShop(response.data);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!shop) {
    return (
      <>
        Loading Shop Data...
        <br />
      </>
    );
  }

  return (
    <div>
      <h3>Shop Detail</h3>
      {shop.cover && <img src={getImageUrl(shop.cover)} width='100' />}
      <div>Shop Name: {shop.name}</div>
      <div>Shop Rating: {shop.rating}</div>
    </div>
  );
}

export default ShopInfo;
