// Libraries
import nextConnect from 'next-connect'

// Middlewares
import { Authentication, Pagination } from 'middlewares'

const serializers = {
  list: ['id', 'name', 'beginTime', 'endTime'],
  retrieve: ['id', 'name', 'beginTime', 'endTime']
}

export default nextConnect({
  attachParams: true
})
  .use(Authentication)
  .get('api/timeslots', (req, res) =>
    Pagination('timeslot', serializers, req, res)
  )
