import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    itemDetail: null,
    expenses: [],
    error: null
    
}

export const expensesCategorySlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        getExpensesStart: state =>{
            state.isLoading = true
        },
        getExpensesSucces: (state, action) => {
            state.isLoading = false
            state.expenses = action.payload;
        },
        getExpensesFailure: (state, action) =>{
            state.error = action.payload
            state.isLoading = false
        }, 

        deleteExpensesStart: state =>{
            state.isLoading = true
        },
        deleteExpensesSuccess: (state, action) =>{
            state.isLoading = false
            state.expenses = action.payload;
        },
        deleteExpensesFailure: (state, action) =>{
            state.error = action.payload
            state.isLoading = false
        },

        postExpensesStart: state =>{
            state.isLoading = true
        },
        postExpensesSuccess: (state, action) =>{
            state.isLoading = false
        },
        postExpensesFailure: state =>{
            state.isLoading = false
            state.error = ("Nimadur xato ketdi")
        },
    }
});

export const {getExpensesStart, getExpensesSucces, getExpensesFailure,
    deleteExpensesStart, deleteExpensesSuccess, deleteExpensesFailure,
    postExpensesStart, postExpensesSuccess, postExpensesFailure
} = expensesCategorySlice.actions;
export default expensesCategorySlice.reducer;