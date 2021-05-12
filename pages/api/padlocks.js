// Libraries
import nextConnect from 'next-connect'

// Middlewares
import { Authentication, Pagination } from 'middlewares'

const serializers = {
  list: ['id', 'name'],
  retrieve: ['id', 'name', 'reference']
}

export default nextConnect({
  attachParams: true
})
  .use(Authentication)
  .get('api/padlocks', (...params) =>
    Pagination('padlock', serializers, ...params)
  )
