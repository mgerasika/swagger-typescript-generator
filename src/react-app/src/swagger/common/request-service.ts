import axios, {AxiosError, AxiosPromise} from 'axios';

export interface IRequestService {
    get(url: string): AxiosPromise;

    post<T>(url: string, body: T): AxiosPromise;

    put<T>(url: string, body: T): AxiosPromise;

    delete<T>(url: string, body?: T): AxiosPromise;

    upload(url: string, formData: FormData): AxiosPromise;
}

export class RequestService implements IRequestService {
    get(url: string): AxiosPromise {
        return axios
            .get(url, {
                data: null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            });
    }

    post<T>(url: string, body: T): AxiosPromise {
        return axios
            .post(url, body, {})
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            });
    }

    put<T>(url: string, body: T): AxiosPromise {
        return axios.put(url, body).catch((error: AxiosError) => {
            return this.handleError(error.response);
        });
    }

    delete<T>(url: string, body?: T): AxiosPromise {
        return axios
            .delete(url, {
                data: body ? body : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            });
    }

    upload(url: string, formData: FormData): AxiosPromise {
        return axios
            .post(url, {
                data: formData ? formData : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            });
    }

    handleError(response: any) {
        return Promise.reject({
            message: 'Unknown error',
            response
        });
    }
}
