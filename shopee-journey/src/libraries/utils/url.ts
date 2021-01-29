const protocol = 'hackathon';

export function getWebUrl(url: string): string {
  return `${protocol}://web?url=${encodeURI(url)}`;
}

export function getProductUrl(shopid: number, itemid: number): string {
  return `${protocol}://product?shopid=${shopid}&itemid=${itemid}`;
}

export function getShopUrl(shopid: number, shopname?: string): string {
  return `${protocol}://shop?${shopid ? `shopid=${shopid}` : ''}${
    !shopid && shopname ? `shopname=${shopname}` : ''
  }`;
}

export function getSearchUrl(query: string) {
  return `${protocol}://search?query=${encodeURI(query)}`;
}

export function getCartUrl() {
  return `${protocol}://cart`;
}

const BASE_IMAGE_URL = `https://cf.shopee.sg/file/`;
const imageSrcWithThumbnail = /_tn$/;

export function getImageUrl(filename: string, isThumbnail = false) {
  return filename
    ? isThumbnail && !imageSrcWithThumbnail.test(filename)
      ? BASE_IMAGE_URL + filename + '_tn'
      : BASE_IMAGE_URL + filename
    : '';
}
