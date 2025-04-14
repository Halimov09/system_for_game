import React, { useState } from 'react'
import { Toolbar} from './'

const Main = () => {
  const [show, setShow] = useState(true)

  const handleToggle = () => {
    setShow(!show)
  }

  return (
    <div className='main'>
      <div className="toogle_section">
      <span onClick={handleToggle} class="material-symbols-outlined toggle_btn">
        menu
      </span>
      </div>
      <div style={{ display: show ? 'block' : 'none' }}>
        <Toolbar handleToggle={handleToggle} />
      </div>
    </div>
  )
}

export default Main