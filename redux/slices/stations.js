import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchStations = createAsyncThunk('manager/ChargePoints', async () => {
    const { data } = await axios.get(`/api/v1/manager/ChargePoint`);
    return data;
})
export const fetchStation = createAsyncThunk('products/fetchProduct', async (id) => {
    const { data } = await axios.get(`products/${id}`);
    return data;
})

// export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
//     const { data } = await axios.get('/tags');
//     return data;
// })
// export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
//     axios.delete(`/posts/${id}`)
// )

const initialState = {
    stations: {
        items: [],
        status: 'loading',
    },
    station: {
        item: [],
        status: 'loading',
    },
}

const stationsSlice = createSlice({
    name: 'stations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Получение всех продуктов
            .addCase(fetchStations.pending, (state) => {
                state.stations.items = [];
                state.stations.status = 'loading';
            })
            .addCase(fetchStations.fulfilled, (state, action) => {
                state.stations.items = action.payload;
                state.stations.status = 'loaded';
            })
            .addCase(fetchStations.rejected, (state) => {
                state.stations.items = [];
                state.stations.status = 'error';
            })
            //Получение одного продукта
            .addCase(fetchStation.pending, (state) => {
                state.station.item = [];
                state.station.status = 'loading';
            })
            .addCase(fetchStation.fulfilled, (state, action) => {
                state.station.item = action.payload;
                state.station.status = 'loaded';
            })
            .addCase(fetchStation.rejected, (state) => {
                state.station.item = [];
                state.station.status = 'error';
            })
        // //Удаление статьи
        // .addCase(fetchRemovePost.pending, (state, action) => {
        //     state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        // })
    },
});

export const { reducer: stationsReducer } = stationsSlice; // Export the postsReducer
