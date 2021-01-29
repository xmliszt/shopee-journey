import * as React from 'react';

import UserInfo from './UserInfo';
import UserCartItems from './UserCartItems';
import UserVouchers from './UserVouchers';

function User() {
  const [error, setError] = React.useState('');

  return (
    <div>
      <h2>USER API</h2>
      {error ? (
        error
      ) : (
        <>
          <UserInfo setError={setError} />
          <UserCartItems />
          <UserVouchers />
        </>
      )}
      <hr />
    </div>
  );
}

export default User;
