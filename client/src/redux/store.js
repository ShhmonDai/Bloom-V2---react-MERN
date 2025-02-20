import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import themeReducer from './theme/themeSlice';
import wallpaperReducer from './wallpaperEngine/wallpaperSlice';


const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
    wallpaper: wallpaperReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializedCheck: false}),
});

export const persistor = persistStore(store);