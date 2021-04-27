import {useSession} from 'next-auth/client'

const Dashboard = ({ session }) => {
    // const [session, loading] = useSession()

    console.warn(session)

    return <div>
        Dashboard page
    </div>
}

export default Dashboard
