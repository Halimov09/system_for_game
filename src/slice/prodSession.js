import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    itemDetail: null,
    prodSession: [],
    error: null
    
}

export const omborSessionSlice = createSlice({
    name: 'prodSession',
    initialState,
    reducers: {
        getOmborSessionStart: state =>{
            state.isLoading = true
        },
        getOmborSessionSucces: (state, action) => {
            state.isLoading = false
            state.prodSession = action.payload;
        },
        getOmborSessionFailure: (state, action) =>{
            state.error = action.payload
            state.isLoading = false
        }, 

        getOmborSessionStart: state =>{
            state.isLoading = true
        },
        getOmborSessionSuccess: (state, action) =>{
            state.isLoading = false
            state.itemDetail = action.payload
        },
        getOmborSessionFailure: state =>{
            state.isLoading = false
        },

        postOmborSessionStart: state =>{
            state.isLoading = true
        },
        postOmborSessionSuccess: (state, action) =>{
            state.isLoading = false
        },
        postOmborSessionFailure: state =>{
            state.isLoading = false
            state.error = ("Nimadur xato ketdi")
        },
    }
});

export const {getOmborSessionFailure, getOmborSessionStart, getOmborSessionSucces, 
    getOmborSessionSuccess, postOmborSessionFailure, postOmborSessionStart,
    postOmborSessionSuccess
} = omborSessionSlice.actions;
export default omborSessionSlice.reducer;