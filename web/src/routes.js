import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Channels = React.lazy(() => import('./views/channels/Channels'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/channels', name: 'Channels', element: Channels },
]

export default routes
