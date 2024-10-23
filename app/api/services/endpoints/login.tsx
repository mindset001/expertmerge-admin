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