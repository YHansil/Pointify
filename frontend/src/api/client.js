import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000/api/v1';

const client = axios.create({ baseURL: BASE_URL, timeout: 10000 });

// Injecte le token JWT dans chaque requête
client.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('pointify_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Callback de logout enregistré par AuthContext
let _onUnauthorized = null;
export const setUnauthorizedCallback = (fn) => { _onUnauthorized = fn; };

client.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      await AsyncStorage.removeItem('pointify_token');
      if (_onUnauthorized) _onUnauthorized();
    }
    return Promise.reject(err);
  }
);

export default client;
