import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAudioSpectrum,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle, cilRouter,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

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
]

export default _nav
