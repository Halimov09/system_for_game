import { configureStore } from '@reduxjs/toolkit';
import countReducer from '../reducers/count';
import  authReducer  from '../slice/auth';

export default configureStore({ reducer: countReducer, 
    reducer: {auth: authReducer},
    devTools: process.env.NODE_ENV !== 'production',
});
// export default configureStore({ reducer: countReducer });