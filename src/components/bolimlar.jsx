import React from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '../ui'


const Bolimlar = () => {
  const {bars, isLoading} = useSelector(state => state.bar)

  
  
  return (
    <div className='maintool'>
        <div className="nav_maintool">
          <h2>Bolimlar</h2>
          <button className='bolim_btn kirish_btn'>Bo'lim qo'shish</button>
        </div>
        {isLoading && <Loader/>}
        <div className="maintool_card">
          {bars.map(item => (
             <div className="main_card" key={item.id}>
              <img  width={100} src={item.image} alt="" />
              <h3>{item.name}</h3>
              <div className="maint_btns">
                <button className='user_btn maint_btn'>O'chirish</button>
              </div>
           </div>
          ))}
        </div>
    </div>
  )
}

export default Bolimlar