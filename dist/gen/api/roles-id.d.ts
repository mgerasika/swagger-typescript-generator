import { AxiosPromise } from 'axios';
import { IRequestService } from 'swagger-typescript-generator/dist';
import { IRole } from '../model';
declare class ApiRolesId {
    requestService: IRequestService;
    constructor(requestService: IRequestService);
    roles_Get(id: number): AxiosPromise<IRole>;
    roles_Put(id: number, value: IRole): AxiosPromise<void>;
    roles_Delete(id: number): AxiosPromise<void>;
}
export declare const apiRolesId: ApiRolesId;
export {};
