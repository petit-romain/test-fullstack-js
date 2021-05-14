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
    icon: DashboardOutlined,
    roles: ['UBIADMIN', 'SUPERADMIN', 'ADMIN', 'MANAGER', 'READER']
  },
  {
    key: 'settings',
    icon: SettingOutlined,
    roles: ['UBIADMIN', 'SUPERADMIN', 'ADMIN'],
    screens: [
      {
        key: 'warehouses',
        icon: TeamOutlined
      },
      {
        key: 'weighingsArea',
        icon: TeamOutlined
      },
      {
        key: 'trailers',
        icon: TeamOutlined
      },
      {
        key: 'timeslots',
        icon: ClockCircleOutlined
      },
      {
        key: 'docks',
        icon: TeamOutlined
      },
      {
        key: 'rotationTimes',
        icon: TeamOutlined
      },
      {
        key: 'boxes',
        icon: TeamOutlined
      },
      {
        key: 'padlocks',
        icon: LockOutlined
      },
      {
        key: 'users',
        icon: TeamOutlined
      }
    ]
  }
]

export default routes
