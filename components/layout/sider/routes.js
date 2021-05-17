import {
  CarOutlined,
  CarryOutOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  ExperimentOutlined,
  HourglassOutlined,
  LockOutlined,
  ScheduleOutlined,
  SettingOutlined,
  ShopOutlined,
  SyncOutlined,
  TeamOutlined,
  WifiOutlined
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
    roles: ['UBIADMIN', 'SUPERADMIN', 'ADMIN', 'MANAGER', 'READER'],
    screens: [
      {
        key: 'warehouses',
        icon: ShopOutlined
      },
      {
        key: 'weighingsArea',
        icon: ExperimentOutlined
      },
      {
        key: 'trailers',
        icon: CarOutlined
      },
      {
        key: 'timeslots',
        icon: ClockCircleOutlined
      },
      {
        key: 'docks',
        icon: EnvironmentOutlined
      },
      {
        key: 'rotationTimes',
        icon: HourglassOutlined
      },
      {
        key: 'boxs',
        icon: WifiOutlined
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
  },
  {
    key: 'discharges',
    icon: DashboardOutlined,
    roles: ['UBIADMIN', 'SUPERADMIN', 'ADMIN', 'MANAGER', 'READER'],
    screens: [
      {
        key: 'active',
        icon: SyncOutlined
      },
      {
        key: 'scheduled',
        icon: ScheduleOutlined
      },
      {
        key: 'completed',
        icon: CarryOutOutlined
      }
    ]
  }
]

export default routes
