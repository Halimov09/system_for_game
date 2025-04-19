import React, { useState } from 'react';
import { logo } from '../constants';
import { Input } from '../ui';
import { useDispatch, useSelector } from 'react-redux';
import { signUserFailure, signUserStart, signUserSucces } from '../slice/auth';
import authService from '../service/auth';

const Login = () => {
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // auth reduxni chaqirish uchun
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.auth)
  console.log(isLoading)

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
    try {
      const response = await authService.login(user) 
      console.log(response)
      dispatch(signUserSucces()) 
    } catch (error) {
      dispatch(signUserFailure(error.response.data)) 
    }
    setFormData({
      username: '',
      password: ''
    })
    // setShow(false);
    // bu yerda formani yuborish funksiyasi yozildi
  };


  return (
    <div className='login ' style={{ display: show ? 'block' : 'none' }}>
      <img src={logo} alt="logo" />
      <h2 className='h2_login'>Ro'yhatdan o'tish</h2>
      <form className='form_login' onSubmit={handleSubmit}>
        <Input
          label="email"
          name="username"
          type="text"
          value={formData.email}
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
