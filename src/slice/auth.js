import { createSlice } from '@reduxjs/toolkit'
import { setItem, getItem } from '../helpers/persistance-storage'

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
      state.isLoading = false
      state.isloggedIn = true
      state.user = action.payload
      setItem('user', action.payload.access)
      console.log(action.payload);
      
    },
    signUserSuccess: (state, action) => {
      state.isLoading = false
      state.isloggedIn = true
      state.user = action.payload.data.user
      getItem('user')
      console.log(action.payload);
      
    },
    signUserFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
      console.log(action);
      
    },
    logoutUser: state => {
      state.user = null
      state.isloggedIn = false
    }
  } 
})

export const {signUserFailure, logoutUser, signUserSucces, signUserSuccess, signUserStart} = authSlice.actions

export default authSlice.reducer