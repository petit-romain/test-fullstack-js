// Libraries
import nextConnect from 'next-connect'

// Middlewares
import { Authentication, Pagination } from 'middlewares'

const serializers = {
  list: ['id'],
  retrieve: ['id']
}

export default nextConnect({
  attachParams: true
})
  .use(Authentication)
  .get('api/rotationTimes', (req, res) =>
    Pagination('rotationTime', serializers, req, res)
  )
