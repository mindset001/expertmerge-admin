import { AxiosResponse } from "axios";
import { APIService } from "../ApiServices";


export const getContent = async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/all-content')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const getUsers= async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/content-users')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const getAllGroups= async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/content-groups')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const getAllForums= async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/content-forums')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const getAllPosts= async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/content-posts')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const getDeletedUsers= async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/content-del-users')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const getSuspendedUsers= async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/content-sus-users')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}

export const getUserAccount = async (user: string) => {
    try {
      const res: AxiosResponse<{ payload: any }> = await APIService.get(`/admin/user-account/${user}`);
      return { response: res.data.payload };
    } catch (error: any) {
      return { error: error.message };
    }
  };
  

  export const getAllNotification = async () => {
    try {
      const res: AxiosResponse<{ payload: any }> = await APIService.get('/admin/admin-not');
      return { response: res.data.payload };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  export const getAdminDetails = async (admin: string) => {
    try {
      const res: AxiosResponse<{ payload: any }> = await APIService.get(`/admin/single-admin/${admin}`);
      return { response: res.data.payload };
    } catch (error: any) {
      return { error: error.message };
    }
  };