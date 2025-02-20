import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    theme: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setDark: (state) => {
            state.theme = 'dark';
        },
    }
});


export const {toggleTheme, setDark} = themeSlice.actions;

export default themeSlice.reducer;