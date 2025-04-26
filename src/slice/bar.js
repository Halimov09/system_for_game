import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    itemDetail: null,
    bars: [],
    error: null,
    id: null,
    
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
            state.id = action.payload.id
        },
        getItemDetailFailure: state =>{
            state.isLoading = false
        },

        postItemDetailStart: state =>{
            state.isLoading = true
        },
        postItemDetailSuccess: (state, action) =>{
            state.isLoading = false
        },
        postItemDetailFailure: state =>{
            state.isLoading = false
            state.error = ("Nimadur xato ketdi")
        },
    }
});

export const {getBarStart, getBarSucces, getBarFailure,
     getItemDetailFailure, getItemDetailStart, getItemDetailSuccess,
        postItemDetailStart, postItemDetailSuccess, postItemDetailFailure
} = barSlice.actions;
export default barSlice.reducer;