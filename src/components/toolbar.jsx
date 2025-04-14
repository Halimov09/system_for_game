import React, { useState } from 'react'
import { LinkMenu } from './ui'

const Toolbar = ({handleToggle}) => {
  return (
        <div className='toolbar'>
            <h2 className='h2_toolbar'>Asosiy</h2>
            <div className='toolbar_btns'>
                <LinkMenu name="Bo'limlar" onClick={handleToggle}/>
                <LinkMenu name="Honalar" onClick={handleToggle}/>
                <LinkMenu name="Ombor" onClick={handleToggle}/>
                <LinkMenu name="Hisobotlar" onClick={handleToggle}/>
            </div>
        </div>
  )
}

export default Toolbar