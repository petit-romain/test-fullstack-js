import React, { useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import { defaultTo, isNil } from 'lodash'

const Home = ({ session }) => {
  const router = useRouter()

  useEffect(() => {
    router.push(
      isNil(session)
        ? '/auth/signin'
        : defaultTo(process.env.NEXT_PUBLIC_APP_HOME_PAGE, '/dashboard')
    )
  }, [])

  return (
    <div className='page'>
      <Spin tip='Chargement en cours...' />
    </div>
  )
}

export const getServerSideProps = async (context) => ({
  props: {
    session: await getSession(context)
  }
})

export default Home
