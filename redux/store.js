import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from './slices/auth'
import { stationsReducer } from "./slices/stations";
import imageUploadSlice from "./slices/imageUploadSlice";
import { favouriteReducer } from "./slices/favourites";
import { faqReducer } from "./slices/faq";
import { payReducer } from "./slices/pay";

const store = configureStore({
    reducer: {
        auth: authReducer,
        stations: stationsReducer,
        imageUpload: imageUploadSlice,
        favourites: favouriteReducer,
        questions: faqReducer,
        pay: payReducer,

    }
});

export default store;
