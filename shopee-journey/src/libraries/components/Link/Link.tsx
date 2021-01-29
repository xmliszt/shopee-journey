import * as React from 'react';

import Bridge from 'libraries/bridges';

// Types
import { LinkProps } from 'react-router-dom';

// Component Libraries
import { Link as ReactRouterLink } from 'react-router-dom';

// Utils
import { isShopeeApp } from 'libraries/utils';
import { getWebUrl } from 'libraries/utils/url';

function Link({
  to,
  children,
  className,
  // replace or push history. Default: push
  // replace will only work for web-app internal route
  replace = false,
  ...rest
}: LinkProps & { replace?: boolean }) {
  if (!isShopeeApp() || replace) {
    return (
      <ReactRouterLink to={to} className={className} {...rest}>
        {children}
      </ReactRouterLink>
    );
  } else {
    return (
      <a
        className={className}
        href='#'
        onClick={() => {
          Bridge.push(getWebUrl(`${window.location.origin}${to}`));
        }}
      >
        {children}
      </a>
    );
  }
}

export default Link;
