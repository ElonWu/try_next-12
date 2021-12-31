import React, { useMemo } from 'react';
import useApi from '@hooks/useApi';
import { Empty } from '@douyinfe/semi-ui';

const ArtistProfile = ({ artistId }: { artistId: string }) => {
  const { data } = useApi<any>(
    `/api/spotify/artist/profile?artistId=${artistId}`,
  );

  if (!data) {
    return <Empty title="暂无数据" />;
  }

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(240px, 1fr))` }}
    >
      {data?.name}
    </div>
  );
};

export default ArtistProfile;
