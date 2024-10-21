import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import searchFeedSlice from "./features/searchFeedSlice";

const rootReducer = combineReducers({
  searchFeedSlice,
  // Add other reducers here
});

const persistConfig = {
  key: 'root',
  storage,
//   whitelist: ['profileSlice', 'chatSlice'], // only profileSlice will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: (arg0: { serializableCheck: boolean; }) => any) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable to avoid issues with non-serializable data like functions
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;