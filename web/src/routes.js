import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Channels = React.lazy(() => import('./views/channels/Channels'))
const ChannelDetail = React.lazy(() => import('./views/channels/ChannelDetail'))
const Teams = React.lazy(() => import('./views/teams/Teams'))
const TeamDetail = React.lazy(() => import('./views/teams/TeamDetail'))
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
  { path: '/teams', name: 'Teams', element: Teams },
  { path: '/teams/:teamId', name: 'Teams', element: TeamDetail },
  { path: '/user-profile', name: 'User Profile', element: UserProfile },
]

export default routes
