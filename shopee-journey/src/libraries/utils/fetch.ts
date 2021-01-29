import { isShopeeApp } from 'libraries/utils';
import Bridge from 'libraries/bridges';

import consts from 'consts';

const getConfig = (userToken?: string) => {
  const headers = userToken ? { 'X-User-Token': userToken } : {};
  return {
    mode: 'cors',
    credentials: 'include',
    headers: {
      'X-Hackathon-Token': consts.HACKATHON_TOKEN,
      ...headers,
    },
    referrerPolicy: 'no-referrer',
  };
};

async function getUserToken() {
  if (!isShopeeApp()) {
    return consts.HACKATHON_USER_TOKEN;
  }
  const { data } = await Bridge.getHackathonUserToken();
  return data || '';
}

function serializeDataForGet(
  data: Record<string, string | number | boolean> = {}
): string {
  if (!data) {
    return '';
  }
  let queryParams = '';
  for (const key in data) {
    if (queryParams) {
      queryParams += '&';
    }
    queryParams += `${key}=${encodeURIComponent(data[key])}`;
  }
  return queryParams ? `?${queryParams}` : '';
}
export async function get(
  url: string,
  data: Record<string, string | number | boolean> = {}
) {
  const response = await fetch(`${url}${serializeDataForGet(data)}`, {
    ...getConfig(await getUserToken()),
    method: 'GET',
  } as RequestInit);
  const responseJson = await response.json();
  return responseJson;
}

export async function post(url: string, data: Record<string, unknown> = {}) {
  const response = await fetch(`${url}`, {
    ...getConfig(await getUserToken()),
    method: 'POST',
    body: JSON.stringify(data),
  } as RequestInit);
  const responseJson = await response.json();
  return responseJson;
}
