import React from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '../ui'
import { useNavigate } from 'react-router-dom'


const Bolimlar = () => {
  const {bars, isLoading} = useSelector(state => state.bar)
  const navigate = useNavigate()



  return (
    <div className='maintool'>
        <div className="nav_maintool">
          <h2>Bolimlar</h2>
          <button onClick={() => navigate(`/CreateGame`)} className='bolim_btn kirish_btn'>Bo'lim qo'shish</button>
        </div>
        {isLoading && <Loader/>}
        <div className="maintool_card">
          {bars.map(item => (
             <div className="main_card" onClick={() => navigate(`/Gaming/${item.id}`)} key={item.id}>
              <img  height={100} src={item.image} alt="" />
              <h3>{item.name}</h3>
              <div className="maint_btns">
                <button  className='user_btn maint_btn'>O'chirish</button>
              </div>
           </div>
          ))}
        </div>
    </div>
  )
}

export default Bolimlar