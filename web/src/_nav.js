import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAlarm,
  cilAudioSpectrum,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Channels',
    to: '/channels',
    icon: <CIcon icon={cilAudioSpectrum} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Alert Routes',
    to: '/alert-routes',
    icon: <CIcon icon={cilAlarm} customClassName="nav-icon" />
  },
]

export default _nav
