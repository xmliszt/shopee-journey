export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const isShopeeApp = () => {
  if (window._isShopeeApp_ === undefined)
    window._isShopeeApp_ = navigator.userAgent.indexOf('Shopee') >= 0;
  return window._isShopeeApp_;
};
