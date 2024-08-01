import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from './slices/auth'
import { stationsReducer } from "./slices/stations";
import imageUploadSlice from "./slices/imageUploadSlice";
// import { videosReducer } from './slices/videos'
// import { bannersReducer } from "./slices/banners";
// import { categoriesReducer } from "./slices/categories";
// import { offersReducer } from "./slices/offersProducts";
// import { newsReducer } from "./slices/news";
const store = configureStore({
    reducer: {
        auth: authReducer,
        // videos: videosReducer,
        stations: stationsReducer,
        imageUpload: imageUploadSlice,
        // banners: bannersReducer,
        // categories: categoriesReducer,
        // offers: offersReducer,
        // news: newsReducer,
        // categories: categoriesReducer,
    }
});

export default store;

// import { postsReducer } from './slices/products'