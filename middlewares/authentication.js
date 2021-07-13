import { defaultTo, isNil } from 'lodash'
import { getSession } from 'next-auth/client'

export default async (req, res, next) => {
  const session = await getSession({ req })

  if (isNil(session?.user)) {
    res.status(401).send({
      key: 'UNAUTHORIZED',
      message: 'Credentials not provided'
    })
    return
  }

  req.user = defaultTo(session?.user, {})

  next()
}