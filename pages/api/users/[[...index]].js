import NextCrud, {PrismaAdapter} from "@premieroctet/next-crud"
import {get} from "lodash"
import prisma from "../../../lib/prisma"

const handler = NextCrud({
    resourceName: "users",
    adapter: new PrismaAdapter({
        modelName: "user",
    }),
    /* onRequest: async (req, res) => {
        console.warn({req })
        if(req.method === "POST") {
            req.body = {
                ...req.body,
                email: `${req.body.firstName}.${req.body.lastName}@ubidreams.com`
            }

            req.next()
        }
    } */
    customHandlers: [
        {
            path: '/(.*)/users/reset',
            methods: ['PATCH'],
            handler: async ({req, res}) => {
                const subscriber = await prisma.user.update({
                    where: {
                        id: parseInt(get(req, 'body.id'))
                    },
                    data: {
                        lastName: "reset",
                        firstName: "reset"
                    }
                })

                res.status(200).json(subscriber)
            }
        }
    ]
})

export default handler