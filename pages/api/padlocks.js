// Libraries
import nextConnect from 'next-connect'

// Middlewares
import { Authentication, Pagination } from 'middlewares'

const serializers = {
  list: ['id', 'name', 'reference'],
  retrieve: ['id', 'name', 'reference']
}

export default nextConnect({
  attachParams: true
})
  .use(Authentication)
  .get('api/padlocks', (req, res) =>
    Pagination('padlock', serializers, req, res)
  )
