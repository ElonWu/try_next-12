import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


export interface UserHomeProps {
  user: any
}

const UserHome: NextPage<UserHomeProps> = ({user}) => {
  return (
    <div>
      <Head>
        <title>ElonWU</title>
      </Head>

      <div className='p-4 bg-gray-500'>
        <h4 className='text-gray-50'>{user?.userId}</h4>
      </div>
    </div>
  )
}

export default UserHome

// // pre-render 指定的 path
// export async function getStaticPaths() {
//   return { paths: ['/user/12'], fallback: false } // 仅支持 pre-render /user/12 的情况
// }


// export async function getStaticProps({ params }: GeStaticPropsContext) {
//   return { props: { 
//       user: {
//         userId: params?.userId
//       }
//    } }
// }


// run-time 实时根据 params 查询和渲染
export async function getServerSideProps ({
  params, req, res, query
}: GetServerSidePropsContext) {

  const userId = parseInt(params?.userId as string);

  if (!userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }


  return {
    props: {
      user: {
        userId
      }
    },
  }
}
