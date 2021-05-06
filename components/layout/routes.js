import {
  ClockCircleOutlined,
  DashboardOutlined,
  LockOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons'

const routes = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: DashboardOutlined,
    roles: ['UBIADMIN', 'SUPERADMIN', 'ADMIN', 'MANAGER', 'READER']
  },
  {
    key: 'settings',
    title: 'Paramètres',
    icon: SettingOutlined,
    roles: ['UBIADMIN', 'SUPERADMIN', 'ADMIN'],
    screens: [
      {
        key: 'warehouses',
        title: 'Magasin et portes',
        icon: TeamOutlined
      },
      {
        key: 'weighings',
        title: 'Zones de pesée',
        icon: TeamOutlined
      },
      {
        key: 'trailers',
        title: 'Brouettes',
        icon: TeamOutlined
      },
      {
        key: 'timeslot',
        title: 'Plages horaires',
        icon: ClockCircleOutlined
      },
      {
        key: 'quay',
        title: 'Quais',
        icon: TeamOutlined
      },
      {
        key: 'rotationTimes',
        title: 'Temps de rotation',
        icon: TeamOutlined
      },
      {
        key: 'boxes',
        title: 'Boîtiers',
        icon: TeamOutlined
      },
      {
        key: 'padlocks',
        title: 'Cadenas',
        icon: LockOutlined
      },
      {
        key: 'users',
        title: 'Utilisateurs',
        icon: TeamOutlined
      }
    ]
  }
]

export default routes
