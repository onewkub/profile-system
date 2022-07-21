import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        drawerOpen: false,
    },
    reducers: {
        openDrawer: state => {
            state.drawerOpen = true;
        },
        closeDrawer: state => {
            state.drawerOpen = false;
        },
    },
});

export const { openDrawer, closeDrawer } = uiSlice.actions;
export default uiSlice.reducer;
