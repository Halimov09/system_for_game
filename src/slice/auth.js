import { createSlice } from '@reduxjs/toolkit'

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
    loginUserStart: state => {
        state.isLoading = true
    },
    loginUserSucces: state => {},
    loginUserFailure: state => {},

    // REGISTER
    RegisterUserStart: state => {
      state.isLoading = true
  },
  RegisterUserSucces: state => {
      state.isLoading = true
      state.isloggedIn = false
  },
  RegisterUserFailure: state => {
      state.isLoading = false
      state.error = 'Error'
  }
  } 
})

export const {
  loginUserStart, loginUserSucces, loginUserFailure, 
  RegisterUserStart, RegisterUserSucces, RegisterUserFailure
 } = authSlice.actions

export default authSlice.reducer