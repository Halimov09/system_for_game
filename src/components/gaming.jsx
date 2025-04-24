import React, { useEffect } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import barService from '../service/bar';
import { useDispatch, useSelector } from 'react-redux';
import { getItemDetailFailure, getItemDetailStart, getItemDetailSuccess } from '../slice/bar';
import { Loader } from '../ui';

const Gaming = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isLoading, itemDetail} = useSelector(state => state.bar)
    

    useEffect(() => {
      const getItemDetaile = async () =>{
        dispatch(getItemDetailStart())
        try {
          const response = await barService.getBarItem(id)
          dispatch(getItemDetailSuccess(response.data))   
          console.log(response.data);       
        } catch (error) {
          dispatch(getItemDetailFailure())
        }
      }

      getItemDetaile()
    }, [id])
    
    const handleclose = () => {
      navigate("/Bo'limlar")
    }

  return (
    <div className='gaming'>
      {isLoading && <Loader />}
      {!itemDetail ? (
        <p>Loading...</p>
      ) : (
        <div className='gaming_item'>
          <button onClick={handleclose} className='user_btn btn_gaming'>orqaga</button>
          <img width={200} src={itemDetail.image} alt="" />
          <h1>Category indeksi: {id}</h1>
          <h2> Category Nomi: {itemDetail.name} </h2>
          <p>Category yaratuvchisi: {itemDetail.created_by}</p>
        </div>
      )}
    </div>
  )
}

export default Gaming