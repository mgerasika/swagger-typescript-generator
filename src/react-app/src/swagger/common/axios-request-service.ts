import axios, {AxiosError, AxiosPromise} from "axios";
import {IRequestService} from "./request-service";

export class RequestService implements IRequestService {
    get<T>(url: string): Promise<T> {
        return axios
            .get(url, {
                data: null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            }) as any as Promise<T>;
    }

    post<T,T2>(url: string, body: T): Promise<T2> {
        return axios
            .post(url, body, {})
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            }) as any as Promise<T2>;
    }

    put<T,T2>(url: string, body: T): Promise<T2> {
        return axios.put(url, body).catch((error: AxiosError) => {
            return this.handleError(error.response);
        })as any as Promise<T2>;
    }

    delete<T,T2>(url: string, body?: T): Promise<T2> {
        return axios
            .delete(url, {
                data: body ? body : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            })as any as Promise<T2>;
    }

    upload<T>(url: string, formData: FormData): Promise<T> {
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