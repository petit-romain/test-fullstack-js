import {defaultTo, get} from 'lodash'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import {Descriptions} from 'antd'

import { fetcher } from '../../lib/swr'

const User = () => {
    const router = useRouter()

    const userId = defaultTo(get(router, 'query.id'), 0)

    const {data, error} = useSWR(['/api/users?id=', userId], fetcher)

    return <div className="user-details">
        <Descriptions title="User Info">
            <Descriptions.Item label="Nom">
                {get(data, 'lastName')}
            </Descriptions.Item>
            <Descriptions.Item label="Prénom">
                {get(data, 'firstName')}
            </Descriptions.Item>
            <Descriptions.Item label="Adresse mail">
                {get(data, 'email')}
            </Descriptions.Item>
        </Descriptions>
    </div>
}

export default User
