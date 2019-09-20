import axios, {AxiosError, AxiosPromise} from 'axios';
import {IRequestService, requestService} from 'swagger-typescript-generator/dist';
import { IRole } from '../model';

class ApiRolesId{
	public requestService:IRequestService; 
	public constructor(requestService:IRequestService) {
		this.requestService = requestService; 
	}
	public roles_Get(id:number):AxiosPromise<IRole>{
		const url = `/api/Roles/${id}`;
		const params = [url];
		return this.requestService.get.apply(this.requestService,params);
	}
	public roles_Put(id:number,value:IRole):AxiosPromise<void>{
		const url = `/api/Roles/${id}`;
		const params = [url,value];
		return this.requestService.put.apply(this.requestService,params);
	}
	public roles_Delete(id:number):AxiosPromise<void>{
		const url = `/api/Roles/${id}`;
		const params = [url];
		return this.requestService.delete.apply(this.requestService,params);
	}
}
export const apiRolesId = new ApiRolesId(requestService);
