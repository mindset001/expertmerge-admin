import { AxiosResponse } from "axios";

import { APIService } from "../ApiServices";

export const createAdmin = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}) => {
    try {
        const res = await APIService.post('/admin/create-admin', data) 
        return { response: res.data.payload.user }
    } catch (error: any) {
        return { error: error.response.data.error || error.message }
    }
}

