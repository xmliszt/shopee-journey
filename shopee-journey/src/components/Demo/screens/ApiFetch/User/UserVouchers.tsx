import * as React from 'react';

import consts from 'consts';

import { get } from 'libraries/utils/fetch';

function UserVouchers() {
  const [vouchers, setVouchers] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await get(`${consts.API_URL}user/get_vouchers`);
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
        Loading User Vouchers...
        <br />
      </>
    );
  }

  return (
    <div>
      <h3>User Vouchers</h3>
      <p>User&apos;s first five voucher</p>
      <ul>
        {(vouchers || []).map((voucher) => {
          return <li key={voucher.voucher_code}>{voucher.voucher_code}</li>;
        })}
      </ul>
    </div>
  );
}

export default UserVouchers;
