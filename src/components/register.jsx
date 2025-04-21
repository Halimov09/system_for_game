import { useEffect, useState } from 'react'
import { signUserFailure, signUserStart, signUserSucces } from '../slice/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../ui';
import { logo } from '../constants';
import authService from '../service/auth';
import {ValidationError} from './';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

    // auth reduxni chaqirish uchun
    const dispatch = useDispatch()
    const {isLoading, isloggedIn} = useSelector(state => state.auth)
    console.log(isLoading)

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    dispatch(signUserStart())
    const user = {
      username: formData.username,
      password: formData.password
    }
    try{
        const response = await authService.register(user)
        dispatch(signUserSucces(response.data))
        alert(response.data.message)
        navigate('/login')
    }catch (error) {
        dispatch(signUserFailure(error.response))
    }

    console.log('Form data:', formData);
    setFormData({
      username: '',
      password: ''
    })
  };

  useEffect(() => {
      if (isloggedIn) {
        navigate('/')
      }
    }, [isloggedIn])

  return (
    <div className='login ' style={{ display: show ? 'block' : 'none' }}>
      <img src={logo} alt="logo" />
      <h2 className='h2_login'>Kompaniyani roýhatdan o'tkazish</h2>
      <ValidationError/>
      <form className='form_login' onSubmit={handleSubmit}>
        <Input
          label="username"
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
            {isLoading ? "ILTIMOS KUTING..." : "Ro'yhatdan o'tish"}	
        </button>
      </form>
    </div>
  );
};

export default Register