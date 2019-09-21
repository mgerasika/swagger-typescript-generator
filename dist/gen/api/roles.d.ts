import { AxiosPromise } from 'axios';
import { IRequestService } from 'swagger-typescript-generator/dist';
import { IRole } from '../model';
declare class ApiRoles {
    requestService: IRequestService;
    constructor(requestService: IRequestService);
    roles_Get(): AxiosPromise<IRole>;
    roles_Post(value: IRole): AxiosPromise<void>;
}
export declare const apiRoles: ApiRoles;
export {};
