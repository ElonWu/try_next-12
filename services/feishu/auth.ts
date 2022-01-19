import sha1 from 'sha1';

const Feishu_Url = 'https://open.feishu.cn/open-apis';

const getTenantAccessToken = async (params: {
  app_id: string;
  app_secret: string;
}) => {
  try {
    const response = await fetch(
      `${Feishu_Url}/auth/v3/tenant_access_token/internal`,
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
    const data = await response.json();

    if (data?.code === 0) {
      return Promise.resolve(data?.tenant_access_token);
    } else {
      return Promise.reject(data?.msg);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

const getTicket = async (token: string) => {
  try {
    const response = await fetch(`${Feishu_Url}/jssdk/ticket/get`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data?.code === 0) {
      return Promise.resolve(data?.data);
    } else {
      return Promise.reject(data?.msg);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

const genSignature = (
  jsTicket: string,
  nonceStr: string,
  timeStamp: number,
  url: string,
) => {
  const verifyStr = `jsapi_ticket=${jsTicket}&noncestr=${nonceStr}&timestamp=${timeStamp}&url=${url}`;
  return sha1(verifyStr);
};

export const getFeishuAuth = async ({
  app_id,
  app_secret,
  url,
  nonceStr,
}: {
  app_id: string;
  app_secret: string;
  url: string;
  nonceStr: string;
}) => {
  try {
    const token = await getTenantAccessToken({
      app_id,
      app_secret,
    });
    console.log('token', token);

    const { ticket, expire_in } = await getTicket(token);
    console.log('ticket', ticket);

    const timestamp = Date.now();

    const signature = genSignature(ticket, nonceStr, timestamp, url);
    console.log('signature', signature);

    return {
      signature,
      timestamp,
      nonceStr,
      expire_in,
      last_update: timestamp,
    };
  } catch (err) {
    console.log(err);
  }
};
