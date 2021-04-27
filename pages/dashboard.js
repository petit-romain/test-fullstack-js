import {getSession} from 'next-auth/client'
import {defaultTo} from 'lodash'

const Dashboard = ({session}) => {
    // const [session, loading] = useSession()

    return <div>
        {defaultTo(session?.user?.name, 'DEFAULT')}
    </div>
}

export default Dashboard
