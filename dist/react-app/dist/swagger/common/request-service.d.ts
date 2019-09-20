import { AxiosPromise } from 'axios';
interface IOptions {
    headers?: any;
    body?: any;
}
export interface IRequestService {
    get(url: string): AxiosPromise;
    post(url: string, options: IOptions): AxiosPromise;
    put(url: string, options: IOptions): AxiosPromise;
    delete(url: string, options?: IOptions): AxiosPromise;
}
declare class RequestService implements IRequestService {
    get(url: string): AxiosPromise;
    post(url: string, options: IOptions): AxiosPromise;
    put(url: string, options: IOptions): AxiosPromise;
    delete(url: string, options?: IOptions): AxiosPromise;
    handleError(response: any): Promise<never>;
}
export declare const requestService: RequestService;
export {};
