import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    itemDetail: null,
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
            state.isLoading = false
        }, 

        getItemDetailStart: state =>{
            state.isLoading = true
        },
        getItemDetailSuccess: (state, action) =>{
            state.isLoading = false
            state.itemDetail = action.payload
        },
        getItemDetailFailure: state =>{
            state.isLoading = false
        },
    }
});

export const {getBarStart, getBarSucces, getBarFailure,
     getItemDetailFailure, getItemDetailStart, getItemDetailSuccess
} = barSlice.actions;
export default barSlice.reducer;