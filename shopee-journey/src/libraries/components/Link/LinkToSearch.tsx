import * as React from 'react';

import consts from 'consts';

import Bridge from 'libraries/bridges';
import { isShopeeApp } from 'libraries/utils';
import { getSearchUrl } from 'libraries/utils/url';

function LinkToSearch({
  className,
  query,
  children,
}: {
  className?: string;
  query: string;
  children: React.ReactNode;
}) {
  if (!isShopeeApp()) {
    return (
      <a
        className={className}
        href={`${consts.SHOPEE_URL}/search?keyword=${encodeURI(query)}`}
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
          Bridge.push(getSearchUrl(query));
        }}
      >
        {children}
      </a>
    );
  }
}

export default LinkToSearch;
