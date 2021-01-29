import * as React from 'react';

import consts from 'consts';

import Bridge from 'libraries/bridges';
import { isShopeeApp } from 'libraries/utils';
import { getProductUrl } from 'libraries/utils/url';

function LinkToProduct({
  className,
  shopid,
  itemid,
  children,
}: {
  className?: string;
  shopid: number;
  itemid: number;
  children: React.ReactNode;
}) {
  if (!isShopeeApp()) {
    return (
      <a
        className={className}
        href={`${consts.SHOPEE_URL}/product/${shopid}/${itemid}`}
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
          Bridge.push(getProductUrl(shopid, itemid));
        }}
      >
        {children}
      </a>
    );
  }
}

export default LinkToProduct;
