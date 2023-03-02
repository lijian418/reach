import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Channels = React.lazy(() => import('./views/channels/Channels'))
const ChannelDetail = React.lazy(() => import('./views/channels/ChannelDetail'))
const AlertEndpoints = React.lazy(() => import('./views/alert-endpoints/AlertEndpoints'))
const AlertEndpointDetail = React.lazy(() => import('./views/alert-endpoints/AlertEndpointDetail'))
const AlertRules = React.lazy(() => import('./views/alert-rules/AlertRules'))
const AlertRuleDetail = React.lazy(() => import('./views/alert-rules/AlertRuleDetail'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/channels', name: 'Channels', element: Channels },
  { path: '/channels/:channelId', name: 'Channel Detail', element: ChannelDetail },
  { path: '/alert-endpoints', name: 'Alert Endpoints', element: AlertEndpoints },
  { path: '/alert-endpoints/:alertEndpointId', name: 'Alert Endpoint Detail', element: AlertEndpointDetail },
  { path: '/alert-rules', name: 'Alert Rules', element: AlertRules },
  { path: '/alert-rules/:alertRuleId', name: 'Alert Rule Detail', element: AlertRuleDetail },
]

export default routes
