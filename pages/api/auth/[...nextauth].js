import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import {isNil} from 'lodash'

import prisma from 'lib/prisma'


export default NextAuth({
    providers: [
        Providers.Credentials({
            authorize: async (credentials) => {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.login
                    }
                })

                if (isNil(user)) {
                    return Promise.reject(new Error('NOT_FOUND'))
                }

                return user
            }
        })
    ],
    database: process.env.DATABASE_URL,
    session: {
        jwt: true
    },
    adapter: Adapters.Prisma.Adapter({prisma}),
})
