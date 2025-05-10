import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    itemDetail: null,
    ombor: [],
    error: null
    
}

export const omborSlice = createSlice({
    name: 'ombor',
    initialState,
    reducers: {
        getOmborStart: state =>{
            state.isLoading = true
        },
        getOmborSucces: (state, action) => {
            state.isLoading = false
            state.ombor = action.payload;
        },
        getOmborFailure: (state, action) =>{
            state.error = action.payload
            state.isLoading = false
        }, 

        getItemOmborStart: state =>{
            state.isLoading = true
        },
        getItemOmborSuccess: (state, action) =>{
            state.isLoading = false
            state.itemDetail = action.payload
        },
        getItemOmborFailure: state =>{
            state.isLoading = false
        },

        postItemOmborStart: state =>{
            state.isLoading = true
        },
        postItemOmborSuccess: (state, action) =>{
            state.isLoading = false
        },
        postItemOmborFailure: state =>{
            state.isLoading = false
            state.error = ("Nimadur xato ketdi")
        },
    }
});

export const {getItemOmborFailure, getItemOmborStart, getItemOmborSuccess, 
    getOmborFailure, getOmborStart, getOmborSucces,postItemOmborFailure,
    postItemOmborStart, postItemOmborSuccess
} = omborSlice.actions;
export default omborSlice.reducer;