import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { isNil } from 'lodash'

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
  callbacks: {
    session: async (session, userToken) => {
      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email
        }
      })
      return {
        ...session,
        user
      }
    }
  },
  adapter: Adapters.Prisma.Adapter({ prisma })
})
