import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    bars: []
    
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
    }
});

export const {getBarStart, getBarSucces} = barSlice.actions;
export default barSlice.reducer;