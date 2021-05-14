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
  .get('api/weighingAreas', (req, res) =>
    Pagination('weighingArea', serializers, req, res)
  )
