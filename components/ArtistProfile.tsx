import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { Empty, Tag } from '@douyinfe/semi-ui';

import { Artist } from '@type/spotify';
import ArtistPreview from './ArtistPreview';

const ArtistProfile = ({ artistId }: { artistId: string }) => {
  const { data: artist } = useApi<Artist>(
    `/api/spotify/artist/profile?artistId=${artistId}`,
  );

  if (!artist) {
    return <Empty title="暂无数据" />;
  }

  return <ArtistPreview artist={artist} />;
};

export default ArtistProfile;
