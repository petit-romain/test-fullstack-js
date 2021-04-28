import React, { useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import { isNil } from 'lodash'

const Home = ({ session }) => {
  const router = useRouter()

  useEffect(() => {
    router.push(isNil(session) ? '/auth/signin' : '/dashboard')
  }, [])

  return (
    <div className='home-screen'>
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
