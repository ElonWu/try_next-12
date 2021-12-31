import { queryParams } from '@utils/format';
import useSWR, { SWRResponse } from 'swr';

const fetcher = (url: string, params: any) =>
  fetch(url + queryParams(params)).then((r) => r.json());

function useApi<Res>(path: string): SWRResponse<Res, Error> {
  return useSWR<Res>(path, fetcher);
}

export default useApi;
