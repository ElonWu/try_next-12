import { queryParams } from '@utils/format';
import { useMemo } from 'react';
import useSWR, { SWRResponse } from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function useApi<T>(
  path: string,
  params?: any,
  options?: { shouldFetch?: boolean },
) {
  const key = useMemo(() => {
    // 优先遵循配置，未配置时默认允许
    let shouldFetch =
      options && 'shouldFetch' in options ? options.shouldFetch : true;

    return shouldFetch ? `${path}${queryParams(params)}` : null;
  }, [options, path, params]);

  console.log({ key });

  const { data, error, mutate, isValidating }: SWRResponse<T, Error> =
    useSWR<T>(key, fetcher);

  return {
    data,
    error,
    hasError: Boolean(error),
    loading: isValidating || (!data && !error),
    reload: mutate,
  };
}

export default useApi;
