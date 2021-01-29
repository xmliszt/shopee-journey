import * as React from 'react';

import ItemSearch from './ItemSearch';
import ItemDetail from './ItemDetail';

function Item() {
  return (
    <>
      <h2>ITEM API</h2>
      <ItemSearch />
      <ItemDetail />
      <hr />
    </>
  );
}

export default Item;
