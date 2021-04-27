import nextConnect from 'next-connect'
import {getSession} from 'next-auth/client'
import {defaultTo, isNil, isArray, forEach, isEmpty, merge, replace} from 'lodash'

import prisma from '../../lib/prisma'

export default nextConnect({
    attachParams: true
})
    .use(async (req, res, next) => {
        const session = await getSession({req})

        console.log(req.method)

        if (isNil(session)) {
            res.writeHead(302, {'Location': '/auth/signin'})
            res.end()
            return
        }

        console.log("test")

        req.user = defaultTo(session?.user, {})
        next()
    })
    .get('api/users', async (req, res) => {
        const {query} = req

        const filters = JSON.parse(defaultTo(query?.filters, '{}'))

        let formattedFilters = []

        forEach(filters, (value, key) => {
            if (isArray(value)) {
                forEach(value, v => {
                    formattedFilters = [...formattedFilters, {
                        [key]: {
                            equals: v
                        }
                    }]
                })
            }
        })


        const conditions = merge(isEmpty(formattedFilters) ? {} : {
            OR: formattedFilters
        }, {
            AND: [{
                email: {
                    not: req?.user?.email
                }
            }]
        })

        const [usersCount, users] = await prisma.$transaction([
            prisma.user.count({where: conditions}),
            prisma.user.findMany({
                take: parseInt(defaultTo(query?.limit, '10')),
                skip: parseInt(defaultTo(query?.offset, '0')),
                where: conditions,
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
    .post('api/users', async (req, res, next) => {
        const user = await prisma.user.create({
            data: req?.body
        })

        res.status(201).json(user)
    })
