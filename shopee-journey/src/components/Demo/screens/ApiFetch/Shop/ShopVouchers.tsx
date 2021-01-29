import * as React from 'react';

import consts from 'consts';

import { get } from 'libraries/utils/fetch';

function ShopVouchers() {
  const [vouchers, setVouchers] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await get(`${consts.API_URL}shop/get_vouchers`, {
        shop_id: 243239155,
      });
      if (isMounted && response && response.data && response.data.vouchers) {
        setVouchers(response.data.vouchers.slice(0, 5));
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!vouchers) {
    return (
      <>
        Loading Shop Vouchers...
        <br />
      </>
    );
  }

  return (
    <div>
      <h3>Shop Vouchers</h3>
      <p>First five vouchers from shop</p>
      <ul>
        {(vouchers || []).map((voucher) => {
          return <li key={voucher.voucher_code}>{voucher.voucher_code}</li>;
        })}
      </ul>
    </div>
  );
}

export default ShopVouchers;
