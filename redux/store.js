import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from './slices/auth'
import { stationsReducer } from "./slices/stations";
import imageUploadSlice from "./slices/imageUploadSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        stations: stationsReducer,
        imageUpload: imageUploadSlice,

    }
});

export default store;
