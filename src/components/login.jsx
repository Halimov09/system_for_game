import React from 'react'
import { logo } from './constants'
import { Input } from './ui'

const Login = () => {
  return (
    <div className='login'>
        <img src={logo} alt="logo" />
        <h2 className='h2_login'>Ro'yhatdan o'tish</h2>
        <form action="#">
            <Input label='email' />
            <Input label='password' />

            <button className='kirish_btn'>KIRISH</button>
        </form>
    </div>
  )
}

export default Login