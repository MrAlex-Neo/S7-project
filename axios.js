import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Создание экземпляра axios с базовым URL
const instance = axios.create({
    baseURL: 'http://91.228.152.152'
});

// Функция для получения токена из AsyncStorage
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Ошибка при получении токена из AsyncStorage:', error);
        return null;
    }
};

// Добавление перехватчика для включения токена в заголовки запросов
instance.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Асинхронное действие для обновления пользователя
export const fetchUpdate = createAsyncThunk('users/update/', async (payload, thunkAPI) => {
    try {
        console.log(payload);

        let config = {
            headers: {
                'Content-Type': 'application/json',
                // Другие заголовки, если необходимо
            }
        };

        let data;
        if (payload.picture) {
            const formData = new FormData();
            for (const key in payload) {
                if (payload.hasOwnProperty(key)) {
                    formData.append(key, payload[key]);
                }
            }
            config.headers['Content-Type'] = 'multipart/form-data';
            data = await instance.patch('/api/v1/users/update/', formData, config);
        } else {
            data = await instance.patch('/api/v1/users/update/', payload, config);
        }

        console.log('data_response', data);
        return data.data;
    } catch (error) {
        console.error('Ошибка запроса:', error.response?.data?.message || error.message);
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export default instance;
