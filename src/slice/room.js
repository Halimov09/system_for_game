import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    itemDetail: null,
    rooms: [],
    error: null
    
}

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        getRoomStart: state =>{
            state.isLoading = true
        },
        getRoomSucces: (state, action) => {
            state.isLoading = false
            state.rooms = action.payload;
        },
        getRoomFailure: (state, action) =>{
            state.error = action.payload
            state.isLoading = false
        }, 

        getItemRoomStart: state =>{
            state.isLoading = true
        },
        getItemRoomSuccess: (state, action) =>{
            state.isLoading = false
            state.itemDetail = action.payload
        },
        getItemRoomFailure: state =>{
            state.isLoading = false
        },

        postItemRoomStart: state =>{
            state.isLoading = true
        },
        postItemRoomSuccess: (state, action) =>{
            state.isLoading = false
        },
        postItemRoomFailure: state =>{
            state.isLoading = false
            state.error = ("Nimadur xato ketdi")
        },
    }
});

export const {getItemRoomFailure, getItemRoomStart, getItemRoomSuccess,
    getRoomStart, getRoomSucces, getRoomFailure,
    postItemRoomStart, postItemRoomSuccess, postItemRoomFailure
} = roomSlice.actions;
export default roomSlice.reducer;