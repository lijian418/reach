import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Channels = React.lazy(() => import('./views/channels/Channels'))
const ChannelDetail = React.lazy(() => import('./views/channels/ChannelDetail'))
const AlertRoutes = React.lazy(() => import('./views/alert-routes/AlertRoutes'))
const AlertRouteDetail = React.lazy(() => import('./views/alert-routes/AlertRouteDetail'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/channels', name: 'Channels', element: Channels },
  { path: '/channels/:channelId', name: 'ChannelDetail', element: ChannelDetail },
  { path: '/alert-routes', name: 'AlertRoutes', element: AlertRoutes },
  { path: '/alert-routes/:alertRouteId', name: 'AlertRouteDetail', element: AlertRouteDetail },
]

export default routes
