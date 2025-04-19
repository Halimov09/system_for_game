import { useState } from 'react'
import { RegisterUserFailure, RegisterUserStart, RegisterUserSucces, signUserFailure, signUserStart, signUserSucces } from '../slice/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../ui';
import { logo } from '../constants';
import authService from '../service/auth';

const Register = () => {
  const [show, setShow] = useState(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    dispatch(signUserStart())
    const user = {
      username: formData.username,
      password: formData.password
    }
    try{
        const response = await authService.register(user)
        dispatch(signUserSucces())
        alert(response.data.message)
    }catch (error) {
        dispatch(signUserFailure(error.response.data))
    }

    console.log('Form data:', formData);
    setFormData({
      username: '',
      password: ''
    })
  };

  // auth reduxni chaqirish uchun
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.auth)
  console.log(isLoading)

  return (
    <div className='login ' style={{ display: show ? 'block' : 'none' }}>
      <img src={logo} alt="logo" />
      <h2 className='h2_login'>Kompaniyani roýhatdan o'tkazish</h2>
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