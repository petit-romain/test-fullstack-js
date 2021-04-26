import {useEffect} from 'react'
import { useRouter} from 'next/router'

const Home = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/dashboard')
    })

    return <div> Home page </div>
}

export default Home
