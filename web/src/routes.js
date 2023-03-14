import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Channels = React.lazy(() => import('./views/channels/Channels'))
const ChannelDetail = React.lazy(() => import('./views/channels/ChannelDetail'))
const Destinations = React.lazy(() => import('./views/destinations/Destinations'))
const DestinationDetail = React.lazy(() => import('./views/destinations/DestinationDetail'))

const AlertRuleChannelCreate = React.lazy(() => import('./views/alert-rules/AlertRuleChannelCreate'))
const AlertRuleChannelEdit = React.lazy(() => import('./views/alert-rules/AlertRuleChannelEdit'))

const SubscriptionCreate = React.lazy(() => import('./views/subscription/SubscriptionCreate'))
const SubscriptionEdit = React.lazy(() => import('./views/subscription/SubscriptionEdit'))

const UserProfile = React.lazy(() => import('./views/profile/UserProfile'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/channels', name: 'Channels', element: Channels },
  { path: '/channels/:channelId', name: 'Channel Detail', element: ChannelDetail },

  { path: '/channels/:channelId/subscriptions/new', name: 'Create Subscription', element: SubscriptionCreate },
  { path: '/channels/:channelId/subscriptions/:subscriptionId/edit', name: 'Edit Subscription', element: SubscriptionEdit },

  { path: '/channels/:channelId/alert-rules/new', name: 'Create Alert Rule', element: AlertRuleChannelCreate },
  { path: '/channels/:channelId/alert-rules/:alertRuleId/edit', name: 'Edit Alert Rule', element: AlertRuleChannelEdit },

  { path: '/destinations', name: 'Destinations', element: Destinations },
  { path: '/destinations/:destinationId', name: 'Destination Detail', element: DestinationDetail },
  { path: '/user-profile', name: 'User Profile', element: UserProfile },
]

export default routes
