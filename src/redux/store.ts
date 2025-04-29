import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSliceReducer from "./auth/auth.slice";
import globalSliceReducer from "./global/global.slice";

const rootStore = {
  global: globalSliceReducer,
  auth: authSliceReducer,
};
const appReducer = combineReducers({
  ...rootStore,
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_APP_NODE_DEV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
