// Libraries
import nextConnect from 'next-connect'

// Middlewares
import { Authentication, Pagination } from 'middlewares'

const serializers = {
  list: ['id', 'name', 'gates'],
  retrieve: ['id', 'name', 'gates']
}

export default nextConnect({
  attachParams: true
})
  .use(Authentication)
  .get('api/warehouses', (req, res) =>
    Pagination('warehouse', serializers, req, res)
  )
