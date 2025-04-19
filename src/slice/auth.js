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
    },
    signUserFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  } 
})

export const {signUserFailure, signUserSucces, signUserStart} = authSlice.actions

export default authSlice.reducer