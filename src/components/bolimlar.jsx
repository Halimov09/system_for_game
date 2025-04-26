import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../ui'
import { useNavigate } from 'react-router-dom'
import barService from '../service/bar'
import { getBarSucces, getItemDetailFailure, getItemDetailStart } from '../slice/bar'
import Honalar from './honalar'


const Bolimlar = () => {
  const {bars, isLoading} = useSelector(state => state.bar)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const getAllBars = async () => {
      try {
        const response = await barService.getBar()
        dispatch(getBarSucces(response.data))
      } catch (error) {
        console.log("Xatolik:", error)
      }
    }
  
    getAllBars()
  }, []) 

  
  
  const deleteItem = async (id) => {
        dispatch(getItemDetailStart())
        try {
          await barService.getdeleteItem(id) 
          alert("Muvaffaqiyatlik o'chirildi")
          navigate("/Bo'limlar")
        } catch (error) {
          dispatch(getItemDetailFailure())
          alert("Xatolik yuz berdi")	
        }
      }
  

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
              <div className="bolim_img">
              <img src={item.image} alt="" />
              </div>
              <h3>{item.name}</h3>
              <div className="maint_btns">
              <button className='user_btn' onClick={() => deleteItem(item.id)}>O'chirish</button>
              </div>
           </div>
          ))}
        </div>
    </div>
  )
}

export default Bolimlar