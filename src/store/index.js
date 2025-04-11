import { configureStore } from '@reduxjs/toolkit';
import countReducer from '../reducers/count';

export default configureStore({ reducer: countReducer, 
    devTools: process.env.NODE_ENV !== 'production',
});
// export default configureStore({ reducer: countReducer });