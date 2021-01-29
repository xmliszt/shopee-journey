import * as React from 'react';

import consts from 'consts';

import Bridge from 'libraries/bridges';
import { isShopeeApp } from 'libraries/utils';
import { getCartUrl } from 'libraries/utils/url';

function LinkToCart({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  if (!isShopeeApp()) {
    return (
      <a
        className={className}
        href={`${consts.SHOPEE_URL}/cart`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    );
  } else {
    return (
      <a
        className={className}
        href='#'
        onClick={() => {
          Bridge.push(getCartUrl());
        }}
      >
        {children}
      </a>
    );
  }
}

export default LinkToCart;
