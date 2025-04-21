import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    bars: [],
    error: null
    
}

export const barSlice = createSlice({
    name: 'bar',
    initialState,
    reducers: {
        getBarStart: state =>{
            state.isLoading = true
        },
        getBarSucces: (state, action) => {
            state.isLoading = false
            state.bars = action.payload;
        },
        getBarFailure: (state, action) =>{
            state.error = action.payload
        }
    }
});

export const {getBarStart, getBarSucces, getBarFailure} = barSlice.actions;
export default barSlice.reducer;