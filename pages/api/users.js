// Libraries
import nextConnect from 'next-connect'

// Middlewares
import { Authentication, Pagination } from 'middlewares'

const serializers = {
  list: ['id', 'firstName', 'lastName', 'email']
}

export default nextConnect({
  attachParams: true
})
  .use(Authentication)
  .get('api/users', (req, res, next) =>
    Pagination(req, res, next, 'user', serializers)
  )
