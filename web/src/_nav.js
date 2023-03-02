import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAlarm,
  cilAudioSpectrum, cilSend,
  cilSpeedometer, cilWarning,
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
