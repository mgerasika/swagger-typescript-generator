import { AxiosPromise } from 'axios';
import { IRequestService } from 'swagger-typescript-generator';
import { IUserModel } from '../model';
declare class ApiUserIdApi {
    _requestService: IRequestService;
    constructor(service: IRequestService);
    user_Get(id: number): AxiosPromise<IUserModel>;
    user_Put(id: number, value: string): AxiosPromise<void>;
    user_Delete(id: number): AxiosPromise<void>;
}
export declare const apiUserIdApi: ApiUserIdApi;
export {};
