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
        const response = await APIService.post("/admin/set-password", data, config);
        return { response: response.data };
    } catch (error:any) {
        return { error: error.response?.data?.message || "An error occurred" };
    }
};




export const getAdminDetails = async () => {
    try {
        const res: AxiosResponse<{payload: any}> = await APIService.get('/admin/details-super')
   
        return { response: res.data.payload }
    } catch (error: any) {
        return { error:  error.message }

    }
}


export const adminLogin = async (data: { email: string; password: string }) => {
  try {
    // Sending POST request for login
    const res: AxiosResponse = await APIService.post('/admin/login', data);

    const payload = res.data.payload;

    if (payload?.auth_token && payload?.admin) {
      // Store token in localStorage
      localStorage.setItem("token", JSON.stringify(payload.auth_token));

      // Fetch and store admin details
      const { response: adminDetails, error } = await getAdminDetails();
      if (adminDetails) {
        localStorage.setItem("adminDetails", JSON.stringify(adminDetails));
      } else {
        console.error("Failed to fetch admin details:", error);
      }
    }

    // Returning the payload for immediate use
    return { response: payload };
  } catch (error: any) {
    // Returning error message if there's an error in the request
    return { error: error.response?.data?.error || error.message };
  }
};


