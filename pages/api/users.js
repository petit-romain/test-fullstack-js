// Libraries
import nextConnect from 'next-connect'

// Middlewares
import { Authentication, Pagination } from 'middlewares'

const serializers = {
  list: ['id', 'firstName', 'lastName', 'email', 'roles']
}

export default nextConnect({
  attachParams: true
})
  .use(Authentication)
  .get('api/users', (req, res) => Pagination('user', serializers, req, res))
