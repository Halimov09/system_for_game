import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    games: [],
    error: null
    
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        getGameStart: state =>{
            state.isLoading = true
        },
        getGameSucces: (state, action) => {
            state.isLoading = false
            state.bars = action.payload;
        },
        getGameFailure: (state, action) =>{
            state.error = action.payload
        }
    }
});

export const {getGameFailure, getGameStart, getGameSucces} = gameSlice.actions;
export default gameSlice.reducer;