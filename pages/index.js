import { Fragment, useEffect } from 'react'
import Router from 'next/router'

const Home = () => {
    const isUserLogged = false

    useEffect(() => {
        isUserLogged ? Router.push('/dashboard') : Router.push('/auth/signin')
    }, [])

    return <Fragment />
}

export default Home
