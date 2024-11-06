import { AxiosResponse } from "axios";
import { APIService } from "../ApiServices";


export const getReportedAccounts = async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/reported-accounts')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const getReport = async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/reports')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const suspendUser = async (data: {
    userId: string;
    
 }) => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.put('/admin/remove-approval', data)
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}



