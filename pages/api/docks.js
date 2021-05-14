// Libraries
import nextConnect from 'next-connect'

// Middlewares
import { Authentication, Pagination } from 'middlewares'

const serializers = {
  list: ['id', 'name'],
  retrieve: ['id', 'name']
}

export default nextConnect({
  attachParams: true
})
  .use(Authentication)
  .get('api/docks', (req, res) => Pagination('dock', serializers, req, res))
