import type { NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button, Empty, IconButton, Input } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';

// util
import { useCallback, useEffect, useState } from 'react';
import type { FC, KeyboardEvent } from 'react';

import { SpotifyGetServerSideProps } from '@services/spotify/spotifyGetServerSideProps';
import { debounce } from 'lodash';
import { local } from '@utils/local_request';
import { Album, SearchResultReponse, Track, Artist } from '@type/spotify';
import AlbumPreview from '@components/AlbumPreview';
import TrackPreview from '@components/TrackPreview';
import ArtistPreview from '@components/ArtistPreview';
import { useRouter } from 'next/router';

const SearchSpotify: NextPage = () => {
  const [search, setSearch] = useState<string | undefined>();

  const [result, setResult] = useState<SearchResultReponse>();

  const onSearch = useCallback(
    debounce(async (search?: string) => {
      if (!search) return;

      const data = await local.get<SearchResultReponse>('/api/spotify/search', {
        q: search,
        type: ['album', 'artist', 'playlist', 'track'].join(','),
      });

      sessionStorage.setItem('lastSearch', search);

      if (data) setResult(data);
    }, 200),
    [],
  );

  const [activeId, setActiveId] = useState<string | null>();

  useEffect(() => {
    const lastSearch = sessionStorage.getItem('lastSearch');

    if (lastSearch) {
      setSearch(lastSearch);
      onSearch(lastSearch);
    }
  }, []);

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

        <div className="flex flex-col space-y-4">
          <List key="track" title="歌曲" isEmpty={!result?.track?.list?.length}>
            {(result?.track?.list || []).map((track: Track) => (
              <TrackPreview
                key={track?.id}
                track={track}
                playing={activeId === track.id}
                onPlay={(activeId) => setActiveId(activeId)}
              />
            ))}
          </List>

          <List key="album" title="专辑" isEmpty={!result?.album?.list?.length}>
            {(result?.album?.list || []).map((album: Album) => (
              <AlbumPreview album={album} key={album?.id} link />
            ))}
          </List>

          <List
            key="artist"
            title="歌手"
            isEmpty={!result?.artist?.list?.length}
          >
            {(result?.artist?.list || []).map((artist: Artist) => (
              <div
                key={artist?.id}
                className="shrink-0 w-56 h-56 flex rounded-md overflow-hidden"
              >
                <ArtistPreview artist={artist} link />
              </div>
            ))}
          </List>
        </div>
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
