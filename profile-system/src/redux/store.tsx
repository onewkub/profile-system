import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';
import ui from './reducers/ui';
const store = configureStore({
    reducer: {
        auth,
        ui,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
