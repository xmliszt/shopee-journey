import * as React from 'react';

import consts from 'consts';

import { getImageUrl } from 'libraries/utils/url';
import { get } from 'libraries/utils/fetch';

type Props = { setError: (str: string) => void };

function UserInfo({ setError }: Props) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await get(`${consts.API_URL}user/get_info`);
      if (!isMounted) {
        return;
      }
      if (!response || response.error || !response.data) {
        setError(
          'Please make sure your HACKATHON_USER_TOKEN is up-to-date or you are logged-in in Shopee App'
        );
      } else {
        setUser(response.data);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [setError]);

  if (!user) {
    return (
      <>
        Loading User Info...
        <br />
      </>
    );
  }

  return (
    <div>
      <h3>User Detail</h3>
      {user.avatar && <img src={getImageUrl(user.avatar)} width='100' />}
      <div>User Name: {user.user_name}</div>
      <div>User Email: {user.email}</div>
    </div>
  );
}

export default UserInfo;
