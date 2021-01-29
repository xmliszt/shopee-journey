import * as React from 'react';

import Bridge from 'libraries/bridges';
import { isShopeeApp } from 'libraries/utils';

function LinkToApp({
  className,
  url,
  children,
}: {
  className?: string;
  url: string;
  children: React.ReactNode;
}) {
  if (!isShopeeApp()) {
    return (
      <a className={className} href={url}>
        {children}
      </a>
    );
  } else {
    return (
      <a
        className={className}
        href='#'
        onClick={() => {
          Bridge.openApp(url);
        }}
      >
        {children}
      </a>
    );
  }
}

export default LinkToApp;
