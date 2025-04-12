import React from 'react'

const Input = ({label}) => {
  return (
    <div>
        <label htmlFor="email"></label>
        <input type={label} id='email' placeholder={label} name='email' required />
    </div>
  )
}

export default Input