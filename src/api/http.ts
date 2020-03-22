import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import config from "../config";

const request = (method: 'get' | 'post', endpoint: string, data = {}, contentType = 'application/json') => {

    let args: AxiosRequestConfig = {
        baseURL: config.api,
        method: method,
        url: endpoint,
        data: data,
        headers: {
            'Content-Type': contentType
        }
    };

    return axios(args)
        .then(handleResponse)
        .catch(handleError);
};

const handleResponse = (response: AxiosResponse): {} | [] => {
    return response.data;
};

const handleError = (error: AxiosError) => {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else {
        console.log(error.message);
    }
};

const get = (url: string): Promise<any> => {
    return request('get', url);
};

const post = (url: string, data?: {}): Promise<any> => {
    return request('post', url, data);
};

export {
    get,
    post
}
