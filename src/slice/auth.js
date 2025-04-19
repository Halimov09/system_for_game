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
    signUserStart: state => {
        state.isLoading = true
    },
    signUserSucces: (state, action) => {
      state.isLoading = true
      state.isloggedIn = false
      state.user = action.payload
    },
    signUserFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  } 
})

export const {signUserFailure, signUserSucces, signUserStart} = authSlice.actions

export default authSlice.reducer