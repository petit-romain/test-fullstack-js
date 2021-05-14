// Libraries
import nextConnect from 'next-connect'

// Middlewares
import { Authentication, Pagination } from 'middlewares'

const serializers = {
  list: ['id', 'name', 'devEUI', 'serialNumber'],
  retrieve: ['id', 'name', 'devEUI', 'serialNumber']
}

export default nextConnect({
  attachParams: true
})
  .use(Authentication)
  .get('api/boxs', (req, res) => Pagination('box', serializers, req, res))
