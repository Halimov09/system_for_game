import React from 'react'
import  menu  from '../constants/img/unnamed.webp'
import settings from "../constants/img/settings_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"


const Bolimlar = () => {
  return (
    <div className='maintool'>
        <div className="nav_maintool">
          <h2>Bolimlar</h2>
          <button className='bolim_btn kirish_btn'>Bo'lim qo'shish</button>
        </div>
        <div className="maintool_card">
          <div className="main_card">
            <img width={100} src={menu} alt="" />
            <h3>Bilyard</h3>
            <img className='settings' src={settings} alt="" />
          </div>
          <div className="main_card">
          <img width={100} src={menu} alt="" />
            <h3>Bilyard</h3>
            <img className='settings' src={settings} alt="" />
          </div>
          <div className="main_card">
          <img width={100} src={menu} alt="" />
            <h3>Bilyard</h3>
            <img className='settings' src={settings} alt="" />
          </div>
          <div className="main_card">
          <img width={100} src={menu} alt="" />
            <h3>Bilyard</h3>
            <img className='settings' src={settings} alt="" />
          </div>
          <div className="main_card">
          <img width={100} src={menu} alt="" />
            <h3>Bilyard</h3>
            <img className='settings' src={settings} alt="" />
          </div>
        </div>
    </div>
  )
}

export default Bolimlar