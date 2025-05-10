import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    itemDetail: null,
    category: [],
    error: null
    
}

export const omborCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getOmborCategoryStart: state =>{
            state.isLoading = true
        },
        getOmborCategorySucces: (state, action) => {
            state.isLoading = false
            state.category = action.payload;
        },
        getOmborCategoryFailure: (state, action) =>{
            state.error = action.payload
            state.isLoading = false
        }, 

        getOmborCategoryStart: state =>{
            state.isLoading = true
        },
        getOmborCategorySuccess: (state, action) =>{
            state.isLoading = false
            state.itemDetail = action.payload
        },
        getOmborCategoryFailure: state =>{
            state.isLoading = false
        },

        postOmborCategoryStart: state =>{
            state.isLoading = true
        },
        postOmborCategorySuccess: (state, action) =>{
            state.isLoading = false
        },
        postOmborCategoryFailure: state =>{
            state.isLoading = false
            state.error = ("Nimadur xato ketdi")
        },
    }
});

export const {getOmborCategoryFailure, getOmborCategoryStart, getOmborCategorySucces,
    getOmborCategorySuccess, postOmborCategoryFailure, postOmborCategoryStart,
    postOmborCategorySuccess
} = omborCategorySlice.actions;
export default omborCategorySlice.reducer;