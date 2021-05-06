import nextConnect from 'next-connect'
import { defaultTo, isNil } from 'lodash'
import { getSession } from 'next-auth/client'

export default nextConnect().use(async (req, res, next) => {
  const session = await getSession({ req })
  if (isNil(session)) {
    res.status(401).send({
      key: 'UNAUTHORIZED',
      message: 'Credentials not provided'
    })
    return
  }

  req.user = defaultTo(session?.user, {})
  next()
})
