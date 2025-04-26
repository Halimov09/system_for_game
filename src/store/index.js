import { configureStore } from '@reduxjs/toolkit';
import countReducer from '../reducers/count';
import  authReducer  from '../slice/auth';
import barsReducer from "../slice/bar";
import roomsReducer from "../slice/room"

export default configureStore({ reducer: countReducer, 
    reducer: {
        auth: authReducer,
        bar: barsReducer,
        room: roomsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});
// export default configureStore({ reducer: countReducer });