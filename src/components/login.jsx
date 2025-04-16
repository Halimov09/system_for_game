import React, { useState } from 'react';
import { logo } from './constants';
import { Input } from './ui';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserStart } from '../slice/auth';

const Login = () => {
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserStart())
    console.log('Form data:', formData);
    setFormData({
      email: '',
      password: ''
    })
    // setShow(false);
    // bu yerda formani yuborish funksiyasi yozildi
  };

  // auth reduxni chaqirish uchun
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.auth)
  console.log(isLoading)

  return (
    <div className='login ' style={{ display: show ? 'block' : 'none' }}>
      <img src={logo} alt="logo" />
      <h2 className='h2_login'>Ro'yhatdan o'tish</h2>
      <form className='form_login' onSubmit={handleSubmit}>
        <Input
          label="email"
          name="email"
          type="email"
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
