import axios, {AxiosError, AxiosPromise} from 'axios';
import {IRequestService, requestService} from 'swagger-typescript-generator/dist';
import { IUser } from '../model';

class ApiUser{
	public requestService:IRequestService; 
	public constructor(requestService:IRequestService) {
		this.requestService = requestService; 
	}
	public user_Get():AxiosPromise<IUser>{
		const url = `/api/User`;
		const params = [url];
		return this.requestService.get.apply(this.requestService,params);
	}
	public user_Post(value:):AxiosPromise<void>{
		const url = `/api/User`;
		const params = [url,value];
		return this.requestService.post.apply(this.requestService,params);
	}
}
export const apiUser = new ApiUser(requestService);
