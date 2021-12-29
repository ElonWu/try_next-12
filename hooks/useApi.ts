import useSWR, { SWRResponse } from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function useApi<Req, Res>(path: string, params?: Req): SWRResponse<Res, Error> {
  return useSWR<Res>(path, fetcher, params);
}

export default useApi;
