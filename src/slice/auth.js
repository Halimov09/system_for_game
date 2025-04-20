import { createSlice } from '@reduxjs/toolkit'
import { setItem } from '../helpers/persistance-storage'

const initialState = {
  isLoading: false,
  isloggedIn: false,
  error: null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // LOGIN
    signUserStart: state => {
        state.isLoading = true
    },
    signUserSucces: (state, action) => {
      state.isLoading = true
      state.isloggedIn = true
      state.user = action.payload
      setItem('user', action.payload.access)
      console.log(action.payload);
      
    },
    signUserSuccess: (state, action) => {
      state.isLoading = true
      state.isloggedIn = true
      state.user = action.payload
      setItem('user', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1MTg3ODE1LCJpYXQiOjE3NDUxODc1MTUsImp0aSI6ImFkMjNhNjk5YzNjNjRmOTRhNTYyOWQ1MTk5ODJkNTYxIiwidXNlcl9pZCI6OH0.PebUAd56Lbz5b94AlASv1Vti1tbV7DS4_TOtod2SodM")
      console.log(action.payload);
      
    },
    signUserFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
      console.log(action);
      
    },
  } 
})

export const {signUserFailure, signUserSucces, signUserSuccess, signUserStart} = authSlice.actions

export default authSlice.reducer