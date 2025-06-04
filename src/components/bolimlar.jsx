import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../ui'
import { useNavigate } from 'react-router-dom'
import barService from '../service/bar'
import { getBarSucces, getItemDetailFailure, getItemDetailStart, getItemDetailSuccess } from '../slice/bar'
import plus from '../constants/img/plus.svg'
import deleted from "../constants/img/delete.svg"
import { toast } from 'react-toastify'
import YouTubeModal from './youtubecomponent'

const Bolimlar = () => {
  const { bars, isLoading } = useSelector(state => state.bar)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [localBars, setLocalBars] = useState([])

  useEffect(() => {
    const getAllBars = async () => {
      try {
        const response = await barService.getBar()
        dispatch(getBarSucces(response.data))
        setLocalBars(response.data)
      } catch (error) {
        toast.error("Bo'limlarni yuklashda xatolik yuz berdi")
        console.log("Xatolik:", error)
      }
    }

    getAllBars()
  }, [])

  const deleteItem = async (id) => {
    dispatch(getItemDetailStart())
    try {
      await barService.getdeleteItem(id)
      dispatch(getBarSucces())
      toast.success("Muvaffaqiyatli o'chirildi")

      // Lokal state dan o'chirish (navigate qilish shart emas)
      setLocalBars(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      dispatch(getItemDetailFailure())
      toast.error("O'chirishda xatolik yuz berdi")
    }
  }

  return (
    <div className='maintool'>
      <YouTubeModal videoId="5G6jO9a4RmY" buttonText="Foydalanish uchun qo'llanma" />
      <div className="nav_maintool">
        <h2>Bo‘limlar</h2>
        <button onClick={() => navigate(`/CreateGame`)} className='btnall bolim_btn kirish_btn'>
          <img src={plus} alt="" />
          Bo‘lim qo‘shish
        </button>
      </div>

      {isLoading && <Loader />}

      <div className="maintool_card">
        {localBars.map(item => (
          <div className="main_card" onClick={() => navigate(`/Gaming/${item.id}`)} key={item.id}>
            <div className="bolim_img">
              <img src={item.image} alt={item.name} />
            </div>
            <h3>{item.name}</h3>
            <div className="maint_btns">
              <button
                className='user_btn'
                onClick={(e) => {
                  e.stopPropagation() // sahifa ochilmasligi uchun
                  deleteItem(item.id)
                }}
              >
                <img src={deleted} alt="" />
                O‘chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bolimlar
