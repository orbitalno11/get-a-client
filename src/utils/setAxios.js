import axios from 'axios';
import { BASE_API_URL, LONGDO_MAP_URL } from "../config/environmentConfig";

let apiGetA = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true
  });

let apiMap = axios.create({
    baseURL : LONGDO_MAP_URL,
    timeout: 10000
})

export const setAuthToken = token => {
    if (token) {
        apiGetA.defaults.headers.common['Authorization'] = "Bearer "+token;
    } else {
        delete apiGetA.defaults.headers.common['Authorization'];
    }
}


export const apiURL = {
    apiGetA,
    apiMap
}

