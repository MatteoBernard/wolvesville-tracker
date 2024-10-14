import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import rolesReducer from './slices/rolesSlice';
import rolesRotationsReducer from './slices/rolesRotationsSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    roles: rolesReducer,
    rolesRotations: rolesRotationsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;