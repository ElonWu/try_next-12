import { User } from '@type/spotify';

declare module 'iron-session' {
  interface IronSessionData {
    spotify?: {
      state?: string;
      last_update?: string;
      expires_in?: number;
      access_token?: string;
      refresh_token?: string;
      profile?: User;
    };

    feishu?: {
      app_id: string;
      app_secret: string;
      url: string;
      nonceStr: string;
      last_update: number;
    };
  }
}
