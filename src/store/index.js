import { configureStore } from '@reduxjs/toolkit';
import countReducer from '../reducers/count';
import  authReducer  from '../slice/auth';
import barsReducer from "../slice/bar";
import roomsReducer from "../slice/room";
import sesReducer from "../slice/session";
import hisobReducer from "../slice/hisobot";

export default configureStore({ reducer: countReducer, 
    reducer: {
        auth: authReducer,
        bar: barsReducer,
        room: roomsReducer,
        session: sesReducer,
        hisobot: hisobReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});
// export default configureStore({ reducer: countReducer });