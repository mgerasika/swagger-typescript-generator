import axios, {AxiosError, AxiosPromise} from 'axios';

interface IOptions {
    headers?: any;
    body?: any;
}

export interface IRequestService {
    get(url: string): AxiosPromise;

    post(url: string, options: IOptions): AxiosPromise;

    put(url: string, options: IOptions): AxiosPromise;

    remove(url: string, options?: IOptions): AxiosPromise;
}

class LoginApi {
    public requestService: IRequestService = {} as IRequestService;

    login(email: string, password: string): AxiosPromise<any> {
        return this.requestService.post('urlManager.config.login.path', {
                body: JSON.stringify({email, password: btoa(password)})
            })
            .then(response => response.data)
            .catch((error: AxiosError) => {
                return Promise.reject({...error});
            });
    }
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

    post(url: string, options: IOptions): AxiosPromise {
        return axios
            .post(url, options.body, {
                headers: options.headers
            })
            .catch((error: AxiosError) => {
                return this.handleError(error.response);
            });
    }

    put(url: string, options: IOptions): AxiosPromise {
        return axios.put(url, options.body, {headers: options.headers}).catch((error: AxiosError) => {
            return this.handleError(error.response);
        });
    }

    remove(url: string, options?: IOptions): AxiosPromise {
        return axios
            .delete(url, {
                ...options,
                data: options && options.body ? options.body : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
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
