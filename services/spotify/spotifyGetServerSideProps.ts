import { withSessionSsr } from '@lib/session';
import { GetServerSidePropsContext } from 'next';
import { refreshSpotifyToken } from './user';

const { SPOTIFY_PLAYER_NAME } = process.env;

export const SpotifyGetServerSideProps = withSessionSsr(
  async ({ req }: GetServerSidePropsContext) => {
    // @ts-ignore
    const profile = req.session?.spotify?.profile;

    // 无登录记录
    if (!profile)
      return {
        redirect: {
          destination: '/spotify',
          permanent: false,
        },
      };

    try {
      // @ts-ignore
      const access_token = await refreshSpotifyToken(req.session.spotify);
      // @ts-ignore
      req.session.spotify.access_token = access_token;
      await req.session.save();
    } catch (err) {
      // 刷新失败
      return {
        redirect: {
          destination: '/spotify',
          permanent: false,
        },
      };
    }

    // @ts-ignore
    const access_token = req.session?.spotify?.access_token;

    // 不能 return 空
    return {
      props: {
        profile,
        access_token,
        SPOTIFY_PLAYER_NAME,
      },
    };
  },
);

export const SpotifyLoginGetServerSideProps = withSessionSsr(
  async ({ req }: GetServerSidePropsContext) => {
    // @ts-ignore
    const profile = req.session?.spotify?.profile;

    // 无登录记录
    if (!profile)
      return {
        props: {},
      };

    try {
      // @ts-ignore
      const access_token = await refreshSpotifyToken(req.session.spotify);
      // @ts-ignore
      req.session.spotify.access_token = access_token;
      await req.session.save();
    } catch (err) {
      // 刷新失败
      return {
        redirect: {
          destination: '/spotify',
          permanent: false,
        },
      };
    }

    // 不能 return 空
    return {
      props: {
        profile,
      },
    };
  },
);
