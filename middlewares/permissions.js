import { defaultTo, includes, isNil, some, get } from 'lodash'

export default async (req, res, next, permissions) => {
  const isList = isNil(req?.params?.id)

  const roles = defaultTo(req?.user?.roles, [])

  const servicePermissions =
    req?.method === 'GET'
      ? get(permissions, isList ? 'list' : 'retrieve')
      : includes(['PUT', 'PATCH'], req?.method)
      ? defaultTo(permissions?.update, [])
      : req?.method === 'DELETE'
      ? defaultTo(permissions?.delete, [])
      : []

  if (!some(roles, (role) => includes(servicePermissions, role))) {
    res.status(403).json({
      key: 'PERMISSION_DENIED',
      message: 'You do not have permission to perform this action'
    })
    return
  }
  next()
}
