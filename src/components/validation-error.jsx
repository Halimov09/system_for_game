import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

const ValidationError = () => {
    const error = useSelector(state => state.auth.error)
   
    const errorMessage = useCallback(() => {
        return Object.keys(error).map(name => {
            const value = error[name];
            const msg = Array.isArray(value) ? value.join(', ') : String(value);
            return  msg;
        });
    }, [error]);

    return (
        <div className='error'>
            {error && errorMessage().map((item, index) => (
                <p key={index} className='error_message'>{item}</p>
            ))}
        </div>
    )
}

export default ValidationError