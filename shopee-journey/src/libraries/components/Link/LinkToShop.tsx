import * as React from 'react';

import consts from 'consts';

import Bridge from 'libraries/bridges';
import { isShopeeApp } from 'libraries/utils';
import { getShopUrl } from 'libraries/utils/url';

function LinkToShop({
  className,
  shopid,
  children,
}: {
  className?: string;
  shopid: number;
  children: React.ReactNode;
}) {
  if (!isShopeeApp()) {
    return (
      <a
        className={className}
        href={`${consts.SHOPEE_URL}/shop/${shopid}`}
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
          Bridge.push(getShopUrl(shopid));
        }}
      >
        {children}
      </a>
    );
  }
}

export default LinkToShop;
