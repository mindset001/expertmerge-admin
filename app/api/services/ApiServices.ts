// 'use client';
import axios from 'axios';
export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;

export const APIService = axios.create({
  baseURL: baseUrl,
});

APIService.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = ` bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const refreshToken = async () => {
//   try {
//     const resp = await APIService.get('/v1/auth/refresh');
//     console.log('refresh token', resp.data);
//     return resp.data;
//   } catch (e) {
//     console.log('Error', e);
//   }
// };

APIService.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    // const originalRequest = error.config;
    if (error.response.data.error === 'Unauthorized') {
        localStorage.removeItem("token")
        if(window.location.pathname !== '/onboarding')
        window.location.replace("/")
    }
    return Promise.reject(error);
  }
);