import axios, { AxiosError } from 'axios';

const createHttpRequest = (apiUrl: string) => {
    const instance = axios.create({
        baseURL: apiUrl,
        timeout: 120000,
    });

    instance.defaults.headers.common['Content-Type'] = 'application/json';

    instance.interceptors.request.use(
        (config: any) => {
            // Do something before request is sent
            return config;
        },
        (error: AxiosError) => {
            // Do something with request error
            return Promise.reject(error);
        },
    );

    // Add a response interceptor
    instance.interceptors.response.use(
        (response: any) => {
            // Do something with response data
            return response;
        },
        (error: AxiosError) => {
            // Do something with request error
            return Promise.reject(error.response?.data);
        },
    );

    const setHeader = (key: string, value: string) => {
        instance.defaults.headers.common[key] = value;
    };

    const setAuthorization = (token: string) => {
        instance.defaults.headers.common['Authorization'] = token;
    };

    return {
        instance,
        get: instance.get,
        put: instance.put,
        post: instance.post,
        delete: instance.delete,
        setHeader,
        setAuthorization,
    };
};

export default createHttpRequest;
