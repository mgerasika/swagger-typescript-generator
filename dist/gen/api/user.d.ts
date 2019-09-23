import { AxiosPromise } from 'axios';
import { IRequestService } from 'swagger-typescript-generator';
import { IUserModel } from '../model';
declare class ApiUserApi {
    _requestService: IRequestService;
    constructor(service: IRequestService);
    user_Get(): AxiosPromise<IUserModel[]>;
    user_Post(value: string): AxiosPromise<void>;
}
export declare const apiUserApi: ApiUserApi;
export {};
