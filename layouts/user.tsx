import Head from 'next/head';
import { NextPage } from 'next';
import { ReactNode } from 'react';

const UserLayout: NextPage<{ title: string; children?: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="bg-slate-50 overflow-x-hidden overflow-y-scroll min-h-screen">
        {children}
      </div>
    </>
  );
};

export default UserLayout;
