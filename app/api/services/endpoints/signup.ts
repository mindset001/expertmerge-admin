import { AxiosResponse } from "axios";
import { APIService } from "../ApiServices";


export const getSignUpRequest = async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/signup-requests')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}


export const getApprovedUsers = async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/approved-users')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const getRejectedUsers = async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/rejected-users')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const getVerification = async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/verification-requests')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}


export const getAllAdmin = async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/verification-requests')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}



