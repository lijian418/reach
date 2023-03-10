import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAlarm,
  cilAudioSpectrum, cilLibraryAdd, cilSend,
  cilSpeedometer, cilUser, cilWarning,
} from '@coreui/icons'
import {CNavItem, CNavTitle} from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },

  {
    component: CNavTitle,
    name: 'User',
  },
  {
    component: CNavItem,
    name: 'Subscriptions',
    to: '/subscriptions',
    icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'User Profile',
    to: '/user-profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Manage',
  },
  {
    component: CNavItem,
    name: 'Channels',
    to: '/channels',
    icon: <CIcon icon={cilAudioSpectrum} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Alert Rules',
    to: '/alert-rules',
    icon: <CIcon icon={cilWarning} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Alert Endpoints',
    to: '/alert-endpoints',
    icon: <CIcon icon={cilSend} customClassName="nav-icon" />
  },
]

export default _nav
