import axios, {AxiosError, AxiosPromise} from 'axios';
import {IRequestService, requestService} from 'swagger-typescript-generator/dist';
import { IRole } from '../model';

class ApiRoles{
	public requestService:IRequestService; 
	public constructor(requestService:IRequestService) {
		this.requestService = requestService; 
	}
	public roles_Get():AxiosPromise<IRole>{
		const url = `/api/Roles`;
		const params = [url];
		return this.requestService.get.apply(this.requestService,params);
	}
	public roles_Post(value:IRole):AxiosPromise<void>{
		const url = `/api/Roles`;
		const params = [url,value];
		return this.requestService.post.apply(this.requestService,params);
	}
}
export const apiRoles = new ApiRoles(requestService);
