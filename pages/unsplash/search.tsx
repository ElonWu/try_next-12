import type { NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button, Empty, IconButton, Input } from '@douyinfe/semi-ui';
import { IconDownload, IconSearch } from '@douyinfe/semi-icons';

// util
import { useCallback, useEffect, useState } from 'react';
import type { FC, KeyboardEvent } from 'react';

import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import { debounce } from 'lodash';
import { local } from '@utils/local_request';
import Loading from '@components/base/loading';
import { UnsplashImage } from '@type/unsplash';

const SearchSpotify: NextPage = () => {
  const [list, setList] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>();

  const onSearch = useCallback(
    debounce(async (search?: string) => {
      if (!search) return;
      sessionStorage.setItem('lastSearch', search);

      try {
        setLoading(true);
        const result = await local.get<UnsplashImage[]>(
          '/api/unsplash/search',
          {
            keyword: search,
          },
        );
        if (result) setList(result);
      } catch (err) {
        setList([]);
      } finally {
        setLoading(false);
      }
    }, 2000),
    [],
  );

  useEffect(() => {
    const lastSearch = sessionStorage.getItem('lastSearch');

    if (lastSearch) {
      setSearch(lastSearch);
      // onSearch(lastSearch);
    }
  }, []);

  const triggerDownload = async (links: any) => {
    const result = await local.post<{ url: string }>(
      '/api/unsplash/trigger_download',
      {
        download_location: links?.download_location,
      },
    );

    if (result?.url) window.open(result.url, '__blank');
  };

  return (
    <UserLayout title="搜索">
      <div className="h-screen w-full overflow-y-auto">
        <div className="flex items-center justify-between p-4 space-x-2">
          <Input
            className="flex-1"
            value={search}
            placeholder="请查找关键字"
            onChange={(value: string) => setSearch(value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.code === 'Enter') onSearch(search);
            }}
          />
          <IconButton icon={<IconSearch />} onClick={() => onSearch(search)} />
        </div>

        <Loading loading={loading} error={false} empty={!list?.length}>
          <div className="flex flex-col space-y-4 px-4 pb-4">
            {list?.map(({ id, alt_description, urls, links, user }: any) => {
              return (
                <div
                  key={id}
                  className="w-full m-auto px-2 pt-2 rounded-md shadow-md"
                >
                  <a
                    href={`${links?.html}?utm_source=Wu&utm_medium=referral`}
                    target="__blank"
                  >
                    <img
                      src={urls?.regular}
                      alt={alt_description}
                      className="w-full h-48 object-cover object-center rounded-sm shadow-sm"
                    />
                  </a>

                  <div className="flex items-center justify-between space-x-4">
                    <p className="flex-1 flex items-center justify-start text-xs text-gray-400 whitespace-nowrap">
                      Photo by
                      <a
                        href={`${user?.links?.html}?utm_source=Wu&utm_medium=referral whitespace-nowrap`}
                        target="__blank"
                        className="text-sm px-1 text-indigo-400 text-decoration-line"
                      >
                        {user.name}
                      </a>
                      on
                      <a
                        href="https://unsplash.com/?utm_source=Wu&utm_medium=referral"
                        target="__blank"
                        className="text-sm px-1 text-indigo-400 text-decoration-line"
                      >
                        Unsplash
                      </a>
                    </p>

                    <IconButton
                      icon={<IconDownload />}
                      onClick={() => triggerDownload(links)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Loading>
      </div>
    </UserLayout>
  );
};

export default SearchSpotify;

// run-time 实时根据 params 查询和渲染
export const getServerSideProps = SpotifyGetServerSideProps;

const List: FC<{ title: string; isEmpty: boolean }> = ({
  children,
  title,
  isEmpty,
}) => (
  <div className="flex flex-col space-y-4">
    <h4 className="font-bold text-lg text-gray-600 px-4">{title}</h4>
    {isEmpty ? (
      <Empty title={`未搜索到${title}`} />
    ) : (
      <div className="flex flex-nowrap overflow-x-auto space-x-4 px-4 pb-2">
        {children}
      </div>
    )}
  </div>
);
