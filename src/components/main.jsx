import React, { useState } from 'react'
import { Toolbar} from './'

const Main = () => {
  const [show, setShow] = useState(true)

  const handleToggle = () => {
    setShow(prev => !prev);
  };

  const handleToolbarLinkClick = () => {
    if (window.innerWidth < 768) {
      setShow(false); 
    }
  };

  return (
    <div className='main'>
      <div className="toogle_section">
      <span onClick={handleToggle} className="material-symbols-outlined toggle_btn">
        menu
      </span>
      </div>
      <div style={{ display: show ? 'block' : 'none' }}>
        <Toolbar onLinkClick={handleToolbarLinkClick} />
      </div>
    </div>
  )
}

export default Main