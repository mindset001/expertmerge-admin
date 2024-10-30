import { AxiosResponse } from "axios";

import { APIService } from "../ApiServices";

export const superLogin = async (data: {
    email: string;
    password: string;
}) => {
    try {
        const res = await APIService.post('/admin/super-admin', data) 
        localStorage.setItem("token", JSON.stringify(res.data.payload.token))
        return { response: res.data.payload.user }
    } catch (error: any) {
        return { error: error.response.data.error || error.message }
    }
}

export const adminLogin = async (data: { email: string; password: string }) => {
    try {
        // Sending POST request for login
        const res: AxiosResponse = await APIService.post('/admin/login', data);
        console.log(data);
        
        // Storing the token in localStorage
        if (res.data?.payload?.auth_token) {
            localStorage.setItem("token", JSON.stringify(res.data.payload.auth_token));
        }
        
        // Returning the user information
        console.log(res.data.payload, 'myself');
        
        return { response: res.data.payload };
    } catch (error: any) {
        // Returning error message if there's an error in the request
        return { error: error.response?.data?.error || error.message };
    }
};