import nextConnect from 'next-connect'

export default nextConnect().use(async (req, res, next) => {
  next()
})
