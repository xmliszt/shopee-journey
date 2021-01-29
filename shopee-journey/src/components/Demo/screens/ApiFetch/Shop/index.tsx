import * as React from 'react';

import ShopInfo from './ShopInfo';
import ShopItems from './ShopItems';
import ShopVouchers from './ShopVouchers';

function Shop() {
  return (
    <div>
      <h2>SHOP API</h2>
      <ShopInfo />
      <ShopItems />
      <ShopVouchers />
      <hr />
    </div>
  );
}

export default Shop;
