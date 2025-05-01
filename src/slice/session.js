import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    itemDetail: null,
    sessions: [],
    error: null
    
}

export const roomSessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        getRoomSesStart: state =>{
            state.isLoading = true
        },
        getRoomSesSucces: (state, action) => {
            state.isLoading = false
            state.sessions = action.payload;
        },
        getRoomSesFailure: (state, action) =>{
            state.error = action.payload
            state.isLoading = false
        }, 

        getItemRoomSesStart: state =>{
            state.isLoading = true
        },
        getItemRoomSesSuccess: (state, action) =>{
            state.isLoading = false
            state.itemDetail = action.payload
        },
        getItemRoomSesFailure: state =>{
            state.isLoading = false
        },

        postItemRoomSesStart: state =>{
            state.isLoading = true
        },
        postItemRoomSesSuccess: (state, action) =>{
            state.isLoading = false
            state.sessions = (action.payload)
        },
        postItemRoomSesFailure: state =>{
            state.isLoading = false
            state.error = ("Nimadur xato ketdi")
        },

        putItemRoomSesStart: state =>{
            state.isLoading = true
        },
        putItemRoomSesSuccess: (state, action) =>{
            state.isLoading = false
            state.sessions = (action.payload)
        },
        putItemRoomSesFailure: state =>{
            state.isLoading = false
            state.error = ("Nimadur xato ketdi")
        },
    }
});

export const {getItemRoomSesFailure, getItemRoomSesStart, getItemRoomSesSuccess,
    getRoomSesStart, getRoomSesSucces, getRoomSesFailure,
    postItemRoomSesStart, postItemRoomSesSuccess, postItemRoomSesFailure,
    putItemRoomSesStart, putItemRoomSesSuccess, putItemRoomSesFailure
} = roomSessionSlice.actions;
export default roomSessionSlice.reducer;