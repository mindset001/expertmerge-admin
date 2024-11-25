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

export const getSuspendedUsers = async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('admin/content-sus-users')
   
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
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/all-admins')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const removeApproval = async (data: {
    userId: string;
    
 }) => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.put('/admin/remove-approval', data)
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const deleteUser = async (userId: string) => {
    try {
      const res: AxiosResponse<{ payload: any }> = await APIService.delete(`/admin/delete-user`, {
        params: { userId }
      });
      return { response: res.data.payload };
    } catch (error: any) {
      return { error: error.message };
    }
  };
  


export const approve = async (data: {
    userId: string;
    
 }) => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.put('/admin/approve-user', data)
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}



export const toggleRequest= async (data: {

 }) => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.put('admin/toggle-signup-request')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}


export const verifyUser = async (data: { userId: string }) => {
    try {
      const res: AxiosResponse<{ payload: any }> = await APIService.put(`/admin/verify/${data.userId}`);
      
      return { response: res.data.payload };
    } catch (error: any) {
      return { error: error.message };
    }
  };
  


  export const toggleView = async (data: { id: string; allowedToViewAll: boolean }) => {
    try {
      const res = await APIService.put(`/admin/set-prof/${data.id}`, { allowedToViewAll: data.allowedToViewAll });
      return { response: res.data.payload };
    } catch (error: any) {
      console.error("Error in toggleView:", error);
      return { error: error.message };
    }
  };
  

  export const toggleNotPref = async (preferenceKey: string, preferenceValue: boolean) => {
    try {
      const res = await APIService.put('/admin/not-preferences', {
        [preferenceKey]: preferenceValue
      });
  
      if (res.data.success) {
        return { response: res.data.payload };
      } else {
        console.error("API error:", res.data.error || "Update failed");
        return { error: res.data.error || "Update failed" };
      }
    } catch (error: any) {
      console.error("Network or server error:", error);
      return { error: error.message || "An unknown error occurred" };
    }
  };
  
  