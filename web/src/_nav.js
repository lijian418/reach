import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAlarm,
  cilAudioSpectrum, cilGroup, cilLibraryAdd, cilSend,
  cilSpeedometer, cilUser, cilWarning,
} from '@coreui/icons'
import {CNavItem, CNavTitle} from '@coreui/react'
import {MdOutlineCallMade, MdOutlineCallReceived} from "react-icons/md";

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'General',
  },
  {
    component: CNavItem,
    name: 'Channels',
    to: '/channels',
    icon: <CIcon icon={cilAudioSpectrum} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Destinations',
    to: '/destinations',
    icon: <MdOutlineCallMade className="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'User',
  },
  {
    component: CNavItem,
    name: 'User Profile',
    to: '/user-profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />
  },
]

export default _nav
