import React, { useState } from 'react'
import { LinkMenu } from './ui'

const Toolbar = ({onLinkClick}) => {
  return (
        <div className='toolbar'>
            <h2 className='h2_toolbar'>Asosiy</h2>
            <div className='toolbar_btns'>
                <LinkMenu name="Bo'limlar" onClick={onLinkClick}/>
                <LinkMenu name="Honalar" onClick={onLinkClick}/>
                <LinkMenu name="Ombor" onClick={onLinkClick}/>
                <LinkMenu name="Hisobotlar" onClick={onLinkClick}/>
            </div>
        </div>
  )
}

export default Toolbar