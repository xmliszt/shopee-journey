import * as React from 'react';

import Bridge from 'libraries/bridges';

import { isShopeeApp } from 'libraries/utils';

function LinkBack({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className={className}
      href='#'
      onClick={() => {
        if (isShopeeApp()) {
          Bridge.pop();
        } else {
          window.history.back();
        }
      }}
    >
      {children}
    </a>
  );
}

export default LinkBack;
