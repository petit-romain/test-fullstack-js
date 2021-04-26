import nextConnect from 'next-connect'
import {defaultTo, isNil, isArray, forEach, isEmpty, slice, replace} from 'lodash'

import prisma from '../../lib/prisma'

export default nextConnect({
    attachParams: true
})
    .get('api/users', async (req, res) => {
        const { query } = req

        const filters = JSON.parse(defaultTo(query?.filters, '{}'))

        let formattedFilters = []

        forEach(filters, (value, key) => {
            if(isArray(value)) {
                forEach(value, v => {
                    formattedFilters = [...formattedFilters, {
                        [key]: {
                            equals: v
                        }
                    }]
                })
            }
        })

        const [usersCount, users] = await prisma.$transaction([
            prisma.user.count(),
            prisma.user.findMany({
                take: parseInt(defaultTo(query?.limit, '10')),
                skip: parseInt(defaultTo(query?.offset, '0')),
                where: isEmpty(formattedFilters) ? {} : {
                    OR: formattedFilters
                },
                orderBy: isNil(query?.sortField) ? {} : {
                    [query?.sortField]: replace(defaultTo(query?.sortOrder, 'ascend'), 'end', '')
                },

            }),
        ])

        res.status(206).json({
            total: usersCount,
            results: users
        })
    })
    .post('api/users', async (req, res) => {
        /* const user = await prisma.user.create({
            data: req?.body
        })*/

        res.status(400).json({
            key: "DUPLICATE",
            message: "ERROR MESSAGE"
        })
    })
