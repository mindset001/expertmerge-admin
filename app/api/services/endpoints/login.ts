import axios, { AxiosResponse } from "axios";

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


export const createPassword = async (data: { password: string }, config?: object) => {
    try {
        const response = await APIService.post("/admin/new-admin", data, config);
        return { response: response.data };
    } catch (error:any) {
        return { error: error.response?.data?.message || "An error occurred" };
    }
};


export const adminLogin = async (data: { email: string; password: string }) => {
    try {
        // Sending POST request for login
        const res: AxiosResponse = await APIService.post('/admin/login', data);
        console.log(data);

        const payload = res.data.payload;

        if (payload?.auth_token && payload?.admin) {
            // Store token in localStorage
            localStorage.setItem("token", JSON.stringify(payload.auth_token));

            // Store additional admin details in localStorage
            localStorage.setItem("adminDetails", JSON.stringify(payload.admin));
        }

        // Returning the payload for immediate use
        console.log(payload, 'myself');
        return { response: payload };
    } catch (error: any) {
        // Returning error message if there's an error in the request
        return { error: error.response?.data?.error || error.message };
    }
};
