import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    wallpaper: 'desktop',
};

const wallpaperSlice = createSlice({
    name: 'wallpaper',
    initialState,
    reducers: {
        toggleWallpaper: (state) => {
            state.wallpaper = state.wallpaper === 'desktop' ? 'wallpaper' : 'desktop';
        },
        setWallpaper: (state) => {
            state.wallpaper = 'wallpaper';
        },
        setDesktop: (state) => {
            state.wallpaper = 'desktop';
        },
    }
});


export const {toggleWallpaper, setWallpaper, setDesktop} = wallpaperSlice.actions;

export default wallpaperSlice.reducer;