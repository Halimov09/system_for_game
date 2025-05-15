import React, { useEffect, useState } from 'react';
import  logo  from '../constants/img/image_2025-04-10_11-31-33.png';
import { Input } from '../ui';
import { useDispatch, useSelector } from 'react-redux';
import { signUserFailure, signUserStart, signUserSucces } from '../slice/auth';
import authService from '../service/auth';
import {ValidationError} from './';
import { useNavigate } from 'react-router-dom';
import { getBarSucces } from '../slice/bar';
import barService from '../service/bar';
import { toast } from 'react-toastify';

const Login = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // auth reduxni chaqirish uchun
  const dispatch = useDispatch()
  const {isLoading, isloggedIn} = useSelector(state => state.auth)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUserStart())
    const user = {
      username: formData.username,
      password: formData.password
    };
    console.log(user);
    
    try {
      const response = await authService.login(user) 
      dispatch(signUserSucces(response.data)) 
      const responses = await barService.getBar()
      dispatch(getBarSucces(responses.data))
      toast.success("Muvaffaqiyatlik bajarildi")
      navigate('/')
    } catch (error) {
      dispatch(signUserFailure(error.response)) 
      toast.error("Hatolik yuz berdi")
    }
    setFormData({
      username: '',
      password: ''
    })
    setShow(false);
    // bu yerda formani yuborish funksiyasi yozildi
  };

  
  useEffect(() => {
    if (isloggedIn) {
      navigate('/')
    }
  }, [isloggedIn])

  return (
    <div className='login ' style={{ display: show ? 'block' : 'none' }}>
      <img src={logo} width={100} alt="logo" />
      <h2 className='h2_login'>Ro'yhatdan o'tish</h2>
      <ValidationError/>
      <form className='form_login' onSubmit={handleSubmit}>
        <Input
          label="email"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          label="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button style={
          {pointerEvents: isLoading ? 'none' : 'auto',
           opacity: isLoading ? 0.5 : 1,}} className='kirish_btn'>
            {isLoading ? "ILTIMOS KUTING..." : "KIRISH"}
        </button>
      </form>
    </div>
  );
};

export default Login;
