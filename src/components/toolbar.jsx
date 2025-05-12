import React, { useState } from 'react'
import { LinkMenu } from '../ui'
import category from "../constants/img/category.svg"
import ombor from "../constants/img/ombor.svg"
import hisobot from "../constants/img/hisobot.svg"
import shop from "../constants/img/shopping.svg"

const Toolbar = ({onLinkClick}) => {
  return (
        <div className='toolbar'>
            <h2 className='h2_toolbar'>Asosiy</h2>
            <div className='toolbar_btns'>
                <LinkMenu img={hisobot} name="Hisobotlar" onClick={onLinkClick}/>
                <LinkMenu img={category} name="Bo'limlar" onClick={onLinkClick}/>
                <LinkMenu img={ombor} name="Ombor" onClick={onLinkClick}/>
                <LinkMenu img={shop} name="Savdo" onClick={onLinkClick}/>
            </div>
        </div>
  )
}

export default Toolbar