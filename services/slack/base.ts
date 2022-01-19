import { SlackResponse } from '@type/slack';
import { queryParams } from '@utils/format';

const SlackBase = `https://slack.com/api`;

const { SLACK_USER_TOKEN } = process.env;

/**
 *
 * @param spotifySession
 * @param params
 * @returns Promise<T>
 *
 * @description 请求 slack
 */

function slackRequest<T>(method: string, url: string, body?: any): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const uri = `${SlackBase}${url}`;

    const payload: RequestInit = {
      method,
      headers: {
        Accept: 'application/json',
        // 'Content-Type': method === "POST" ? 'application/x-www-form-urlencoded' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SLACK_USER_TOKEN}`,
      },
    };
    if (body) payload.body = JSON.stringify(body);

    try {
      const response = await fetch(uri, payload);

      const contentType = response.headers.get('content-type');

      console.log({ uri, body, method, resContentType: contentType });

      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data: SlackResponse<T> = await response.json();

        if (data?.ok) {
          resolve(data);
        } else {
          reject(data.error);
        }
      } else {
        const result = await response.text();
        // console.log({ response });
        resolve(result as any);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function slackGet<T>(url: string, query?: any): Promise<T> {
  return slackRequest('GET', url + queryParams(query));
}

export function slackPost<T>(url: string, body?: any): Promise<T> {
  return slackRequest('POST', url, body);
}

export function slackDelete<T>(url: string, body?: any): Promise<T> {
  return slackRequest('DELETE', url, body);
}

export function slackPut<T>(url: string, body?: any): Promise<T> {
  return slackRequest('PUT', url, body);
}
