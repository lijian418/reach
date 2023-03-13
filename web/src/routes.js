import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Channels = React.lazy(() => import('./views/channels/Channels'))
const ChannelDetail = React.lazy(() => import('./views/channels/ChannelDetail'))
const Destinations = React.lazy(() => import('./views/destinations/Destinations'))
const DestinationDetail = React.lazy(() => import('./views/destinations/DestinationDetail'))
const AlertRuleDetail = React.lazy(() => import('./views/alert-rules/AlertRuleDetail'))
const EditRules = React.lazy(() => import('./views/alert-rules/EditRules'))
const UserProfile = React.lazy(() => import('./views/profile/UserProfile'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/channels', name: 'Channels', element: Channels },
  { path: '/channels/:channelId', name: 'Channel Detail', element: ChannelDetail },
  { path: '/channels/:channelId/alert-rule/:alertRuleId', name: 'Alert Rule Detail', element: AlertRuleDetail },
  { path: '/channels/:channelId/alert-rule/:alertRuleId/edit-rules', name: 'Alert Rule Edit Rules', element: EditRules },
  { path: '/destinations', name: 'Destinations', element: Destinations },
  { path: '/destinations/:destinationId', name: 'Destination Detail', element: DestinationDetail },
  { path: '/user-profile', name: 'User Profile', element: UserProfile },
]

export default routes
