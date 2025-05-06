import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    itemDetail: null,
    hisobot: [],
    error: null
    
}

export const hisobotSlice = createSlice({
    name: 'hisobot',
    initialState,
    reducers: {
        getHisobStart: state =>{
            state.isLoading = true
        },
        getHisobSucces: (state, action) => {
            state.isLoading = false
            state.hisobot = action.payload;
        },
        getHisobFailure: (state, action) =>{
            state.error = action.payload
            state.isLoading = false
        }, 
    }
});

export const {getHisobFailure, getHisobStart, getHisobSucces
} = hisobotSlice.actions;
export default hisobotSlice.reducer;