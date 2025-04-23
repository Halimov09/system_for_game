import React from 'react'
import {  useNavigate, useParams } from 'react-router-dom'

const Gaming = () => {
    const {id} = useParams();
    const navigate = useNavigate()

    console.log(id);
    
    const handleclose = () => {
        navigate("/")
    }

  return (
    <div className='gaming'>
        <button onClick={handleclose} className='user_btn btn_gaming'>orqaga</button>
        <h1>id: {id}</h1>
    </div>
  )
}

export default Gaming