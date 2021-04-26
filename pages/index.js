import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {isNil} from 'lodash'
import {Spin} from 'antd'

import '../styles/App.module.less'

const Home = ({session}) => {
    const router = useRouter()

    useEffect(() => {
        const redirectRoute = isNil(session) ? '/auth/signin' : '/dashboard'

        router.push(redirectRoute)
    }, [])

    return <div className='home-screen'>
        <Spin tip='Loading...'/>
    </div>
}

export default Home
