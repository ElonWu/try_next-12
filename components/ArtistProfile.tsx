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
    <div className="flex p-2">
      <div className="w-full bg-white rounded-md shadow-md p-4">
        <h4>{data?.name}</h4>
      </div>
    </div>
  );
};

export default ArtistProfile;
