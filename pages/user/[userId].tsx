import type { GetServerSidePropsContext, NextPage } from 'next';

import { User } from '@models/user';
import UserLayout from '@layouts/user';
import { findUser, findUserById } from '@services/user';

const UserDetail: NextPage<{ user: User }> = ({ user }) => {
  return (
    <UserLayout title="用户详情">
      <div className="p-4 bg-gray-500">
        <h4 className="text-gray-50">详情: {user?.name}</h4>
      </div>
    </UserLayout>
  );
};

export default UserDetail;

// run-time 实时根据 params 查询和渲染
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  let user: User | null = null;

  if (params?.userId) {
    user = await findUserById(params.userId as string);
  }

  if (!user) {
    return {
      redirect: {
        destination: '/user',
        permanent: false,
      },
    };
  }

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
}
