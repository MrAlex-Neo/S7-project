import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk('users/login/', async (params) => {
    const { data } = await axios.post('/users/login/', params);
    return data;
})
export const fetchCode = createAsyncThunk('users/verify/', async (params) => {
    const { data } = await axios.post('/users/verify/', params);
    return data;
})
export const fetchUpdate = createAsyncThunk('users/update/', async (params) => {
    const { data } = await axios.post('/users/update/', params);
    return data;
})
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/users/me/');
    return data;
})
export const fetchRegister = createAsyncThunk('users/new/', async (params) => {
    const { data } = await axios.post('/users/new/', params);
    return data;
})
// export const fetchTokenRefresh = createAsyncThunk('auth/fetchTokenRefresh', async (params) => {
//     const { data } = await axios.post('/users/token/refresh/', params);
//     return data;
// })

const initialState = {
    data: null,
    status: 'loading'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.data = null
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'error';
                state.data = null
            })
            
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error';
                state.data = null
            })

            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'error';
                state.data = null
            })
            
            .addCase(fetchUpdate.pending, (state) => {
                state.status = 'loading';
                state.data = null
            })
            .addCase(fetchUpdate.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchUpdate.rejected, (state) => {
                state.status = 'error';
                state.data = null
            })

            .addCase(fetchCode.pending, (state) => {
                state.status = 'loading';
                state.data = null
            })
            .addCase(fetchCode.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload
            })
            .addCase(fetchCode.rejected, (state) => {
                state.status = 'error';
                state.data = null
            })
    },
});
export const selectIsAuth = (state) => Boolean(state.data)

export const { reducer: authReducer } = authSlice;
export const { logout } = authSlice.actions;