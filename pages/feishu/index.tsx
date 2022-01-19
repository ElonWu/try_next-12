import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';

// omponent
import UserLayout from '@layouts/user';
import { Button, Input, Notification, Toast } from '@douyinfe/semi-ui';

// util
import { local } from '@utils/local_request';
import useApi from '@hooks/useApi';

const Feishu: NextPage = () => {
  const [tt, setTT] = useState<any>();

  const [userInfo, setUserInfo] = useState<any>();

  const getUserInfo = useCallback(async () => {
    tt?.getUserInfo({
      withCredentials: true,
      success(res: any) {
        setUserInfo(res?.userInfo);
      },
      fail(res: any) {
        Toast.info(`getUserInfo fail: ${JSON.stringify(res)}`);
      },
    });
  }, [tt]);

  const sendEmail = useCallback(async () => {
    tt?.mailto({
      to: ['wrzmonkey@gmail.com'],
      subject: '测试',
      body: '测试',
      success(res: any) {
        Toast.info(JSON.stringify(res));
      },
      fail(res: any) {
        Toast.info(`mailto fail: ${JSON.stringify(res)}`);
      },
    });
  }, [tt]);

  const setBrightness = useCallback(async () => {
    tt?.setScreenBrightness({
      value: 0.8,
      success(res: any) {
        Toast.info(JSON.stringify(res));
      },
      fail(res: any) {
        Toast.info(`setScreenBrightness fail: ${JSON.stringify(res)}`);
      },
    });
  }, [tt]);

  const makePhonecall = useCallback(async () => {
    tt?.makePhoneCall({
      phoneNumber: '18819465569',
      success(res: any) {
        Toast.info(JSON.stringify(res));
      },
      fail(res: any) {
        Toast.info(`makePhoneCall fail: ${JSON.stringify(res)}`);
      },
    });
  }, [tt]);

  return (
    <UserLayout
      title="飞书"
      scripts={[
        {
          src: 'https://lf1-cdn-tos.bytegoofy.com/goofy/ee/lark/h5jssdk/lark/js_sdk/h5-js-sdk-1.5.12.js',
          strategy: 'afterInteractive',
          onLoad: () => {
            // @ts-ignore
            Toast.info('onLoad');

            // @ts-ignore
            if (!window.h5sdk) {
              Toast.info('h5sdk not attached');
              return;
            }

            // @ts-ignore
            window.h5sdk.ready?.(async () => {
              Toast.info('onReady');

              // @ts-ignore
              const { timestamp, nonceStr, signature, refresed } =
                await local.get('/api/feishu/auth');

              // 只在 ticket 更新后需要重新 config，其他情况不需要重复
              if (!refresed) {
                // @ts-ignore
                setTT(window.tt);
                return;
              }

              // @ts-ignore
              window.h5sdk.config({
                appId: 'cli_a16faa90a97cd013', // 必填，应用ID
                timestamp,
                nonceStr,
                signature,
                // 当前开发文档中的网页应用API 均无需填写改字段
                // jsApiList: [],
                onSuccess: function () {
                  // @ts-ignore
                  Toast.info('config onSuccess');
                  // @ts-ignore
                  setTT(window.tt);
                  // 成功回调，可以在成功之后使用 tt.xx jsapi
                },
                onFail: function (err: any) {
                  Toast.info('config error:' + JSON.stringify(err));
                },
              });
            });
          },
        },
        {
          dangerouslySetInnerHTML: {
            __html: `
              (function(i,s,o,g,r,a,m){i["SlardarMonitorObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date;a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);i[r].globalPreCollectError = function () {i[r]('precollect', 'error', arguments);};if (typeof i.addEventListener === 'function') {i.addEventListener('error', i[r].globalPreCollectError, true)}})(window,document,"script","https://i.snssdk.com/slardar/sdk.js?bid=oapi_0x5f3759df_v1_cli_a16faa90a97cd013","Slardar");
              window.Slardar('config', {bid: 'oapi_0x5f3759df_v1_cli_a16faa90a97cd013'});
            `,
          },
        },
      ]}
    >
      <div className="flex flex-col items-stretch space-y-4">
        <h4>飞书</h4>

        {tt ? (
          <div>
            <Button onClick={getUserInfo}>获取用户信息</Button>

            <Button onClick={sendEmail}>测试邮件</Button>

            <Button onClick={setBrightness}>测试亮度</Button>

            <Button onClick={makePhonecall}>测试电话</Button>
          </div>
        ) : (
          <h4>授权中</h4>
        )}

        {userInfo?.nickName || '未登录'}
      </div>
    </UserLayout>
  );
};

export default Feishu;
