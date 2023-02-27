import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://github.com/lijian418/reach" target="_blank" rel="noopener noreferrer">
          Reach
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
