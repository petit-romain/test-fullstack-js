import {defaultTo, find, map} from 'lodash'
import {Tag} from 'antd'

import {TableLayout} from 'components'

import prisma from 'lib/prisma'

const Users = ({model = {}}) => {
    const columns = [
        {
            title: "Identifiant",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Nom / Prénom",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => (
                defaultTo(a?.name, '').localeCompare(defaultTo(b?.name, ''))
            )
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => (
                defaultTo(a?.email, '').localeCompare(defaultTo(b?.email, ''))
            )
        },
        {
            title: "Rôles",
            dataIndex: "roles",
            key: "roles",
            filters: map(defaultTo(find(model?.fields, ['name', 'roles']).choices, []), choice => ({
                text: choice,
                value: choice
            })),
            render: roles => (
                <div className="column-roles">
                    {map(roles, (role, index) => (
                        <Tag key={index}>
                            {role}
                        </Tag>
                    ))}
                </div>
            )
        }
    ]

    return <TableLayout
        model={model}
        columns={columns}
    />
}

export const getServerSideProps = async () => {
    const prismaModels = prisma._dmmf.datamodel.models
    const prismaEnums = prisma._dmmf.datamodel.enums


    const modelName = 'User'
    const model = find(prismaModels, ['name', modelName])

    const fields = map(defaultTo(model?.fields, []), ({kind, type, ...field}) => {
        const choices = kind === 'enum' ? find(prismaEnums, ['name', type]).values : []

        return {
            ...field,
            kind,
            type,
            choices: kind === 'enum' ? map(choices, 'name') : []
        }

    })

    return {
        props: {
            model: {
                name: modelName,
                fields,
                blackListFields: ['email', 'emailVerified', 'image', 'createdAt', 'updatedAt']
            }

        }
    }

}

export default Users
