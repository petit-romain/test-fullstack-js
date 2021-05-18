export const getRoleColor = (role) => {
  switch (role) {
    case 'UBIADMIN':
      return 'purple'
    case 'SUPERADMIN':
      return 'red'
    case 'ADMIN':
      return 'orange'
    case 'MANAGER':
      return 'blue'
    case 'READER':
      return 'green'
  }
}
