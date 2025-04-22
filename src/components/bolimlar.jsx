import React from 'react'
import settings from "../constants/img/settings_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
import { useSelector } from 'react-redux'


const Bolimlar = () => {
  const {bars} = useSelector(state => state.bar)

  bars.forEach(element => {
    console.log(element.name, element.image);
    
  });
  
  
  return (
    <div className='maintool'>
        <div className="nav_maintool">
          <h2>Bolimlar</h2>
          <button className='bolim_btn kirish_btn'>Bo'lim qo'shish</button>
        </div>
        <div className="maintool_card">
          {bars.map(item => (
             <div className="main_card" key={item.id}>
             <img width={100} src={item.image} alt="" />
             <h3>{item.name}</h3>
             <img className='settings' src={settings} alt="" />
           </div>
          ))}
        </div>
    </div>
  )
}

export default Bolimlar