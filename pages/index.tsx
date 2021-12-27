import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


export interface User {
  name: string, age: number
}


const Home: NextPage<{user: User}> = ({user}) => {
  return (
    <div>
      <Head>
        <title>{user?.name}</title>
      </Head>

      <div className='p-4 bg-gray-500'>
        <Image src="/img/vercel.svg" alt="logo" width={141} height={32} />
        <h4 className='text-gray-50'>{user?.name}</h4>
      </div>
    </div>
  )
}

export default Home


// 构建时完成数据绑定
export const getStaticProps: GetStaticProps = async () => {

  const user: User = {
    name: 'elonwu', age: 29
  };

  return {
    props: {
      user
    },
  }
}
