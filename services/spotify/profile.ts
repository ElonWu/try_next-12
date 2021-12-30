import { Request } from '@utils/request';

const spotifyRequest = new Request('', {
  onSuccess: (data: any) => {
    return Promise.resolve(data);
  },
  onError: (err: any) => {
    const errMsg = err?.response.statusText || '未知错误';
    return Promise.reject(errMsg);
  },
});

export const getSpotifyProfile = (access_token: string) => {
  return fetch('https://api.spotify.com/v1/me', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
};
