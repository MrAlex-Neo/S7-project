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

export default instance;
