import {useEffect} from 'react'
import {useSession} from 'next-auth/client'
import {useRouter} from 'next/router'

import {isNil} from 'lodash'

import Layout from '../components/layout'

const Dashboard = () => {
    const router = useRouter()
    const [session] = useSession()

    useEffect(() => {
        router.push(isNil(session) ? '/auth/signin' : '/dashboard')
    }, [session])

    return <Layout session={session}>
        Dashboard page
    </Layout>
}

export default Dashboard