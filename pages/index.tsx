import type { GetServerSidePropsContext, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { getUsers } from '../services/user';
import { User } from '../models/user';
import useSWR from 'swr';
import { useMemo } from 'react';
import { Button } from '@douyinfe/semi-ui';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// const Home: NextPage = () => {
// const { data } = useSWR('/api/user', fetcher);
// const users = useMemo(() => (Array.isArray(data) ? data : []), [data]);

const Home: NextPage<{ users: (User & { _id: string })[] }> = ({ users }) => {
  return (
    <div>
      <Head>
        <title>用户列表</title>
      </Head>

      <div className="flex flex-col space-y-4 p-4 bg-gray-500 m-auto items-center">
        <Image src="/img/vercel.svg" alt="logo" width={141} height={32} />

        <div className="p-4 rounded bg-slate-50 flex flex-col space-y-4 ">
          {users?.map((user: User & { _id: string }) => {
            const { _id, name, email } = user;
            return (
              <div key={_id}>
                <h2>{name}</h2>
                <Button>{email}</Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

// 构建时完成数据绑定
// export const getStaticProps: GetStaticProps = async () => {
//   const users: User[] = await getUsers();

//   return {
//     props: {
//       users: JSON.parse(JSON.stringify(users)),
//     },
//   };
// };

// run-time 实时根据 params 查询和渲染
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const users: (User & { _id: string })[] = await getUsers();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)), // mongoose 的响应不能直接被序列化
    },
  };
}
