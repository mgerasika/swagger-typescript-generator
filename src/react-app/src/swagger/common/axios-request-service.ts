import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {IRequestService} from "../../common-client-only/request-service";

export class RequestService implements IRequestService<AxiosRequestConfig> {
    get<T>(url: string, options?:AxiosRequestConfig): Promise<T> {
        return axios
            .get(url, {
                data: null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            }) as any as Promise<T>;
    }

    head<T>(url: string, options?:AxiosRequestConfig): Promise<T> {
        return axios
            .head(url, {
                data: null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            }) as any as Promise<T>;
    }

    post<T, T2>(url: string, body?: T, options?:AxiosRequestConfig): Promise<T2> {
        return axios
            .post(url, body, {})
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            }) as any as Promise<T2>;
    }

    put<T, T2>(url: string, body?: T, options?:AxiosRequestConfig): Promise<T2> {
        return axios.put(url, body).catch((error: AxiosError) => {
            return this.handleError(error.response);
        }) as any as Promise<T2>;
    }

    delete<T, T2>(url: string, body?: T, options?:AxiosRequestConfig): Promise<T2> {
        return axios
            .delete(url, {
                data: body ? body : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            }) as any as Promise<T2>;
    }

    upload<T>(url: string, formData: FormData, options?:AxiosRequestConfig): Promise<T> {
        return axios
            .post(url, {
                data: formData ? formData : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            }) as any as Promise<T>;
    }

    handleError(response: any) {
        return Promise.reject({
            message: 'Unknown error',
            response
        });
    }
}