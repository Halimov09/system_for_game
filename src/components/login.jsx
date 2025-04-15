import React, { useState } from 'react';
import { logo } from './constants';
import { Input } from './ui';

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
    console.log('Form data:', formData);
    setFormData({
      email: '',
      password: ''
    })
    setShow(false);
    // bu yerda formani yuborish funksiyasi yozildi
  };



  return (
    <div className='login ' style={{ display: show ? 'block' : 'none' }}>
      <img src={logo} alt="logo" />
      <h2 className='h2_login'>Ro'yhatdan o'tish</h2>
      <form className='form_login' onSubmit={handleSubmit}>
        <Input
          label="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className='kirish_btn'>KIRISH</button>
      </form>
    </div>
  );
};

export default Login;
