import axios, {AxiosError, AxiosPromise} from 'axios';

export interface IRequestService {
    get(url: string): AxiosPromise;

    post(url: string, body: any): AxiosPromise;

    put(url: string, body: any): AxiosPromise;

    delete(url: string, body?: any): AxiosPromise;
}

class RequestService implements IRequestService {
    get(url: string): AxiosPromise {
        return axios
            .get(url, {
                data: null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            });
    }

    post(url: string, body: any): AxiosPromise {
        return axios
            .post(url, body, {
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            });
    }

    put(url: string, body: any): AxiosPromise {
        return axios.put(url, body).catch((error: AxiosError) => {
            return this.handleError(error.response);
        });
    }

    delete(url: string,body:any): AxiosPromise {
        return axios
            .delete(url, {
                data: body ? body : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
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
export const requestService = new RequestService();
