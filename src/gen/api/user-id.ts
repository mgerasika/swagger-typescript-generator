import axios, {AxiosError, AxiosPromise} from 'axios';
import {IRequestService, requestService} from 'swagger-typescript-generator/dist';
import { IUser } from '../model';

class ApiUserId{
	public requestService:IRequestService; 
	public constructor(requestService:IRequestService) {
		this.requestService = requestService; 
	}
	public user_Get(id:number):AxiosPromise<IUser>{
		const url = `/api/User/${id}`;
		const params = [url];
		return this.requestService.get.apply(this.requestService,params);
	}
	public user_Put(id:number,value:):AxiosPromise<void>{
		const url = `/api/User/${id}`;
		const params = [url,value];
		return this.requestService.put.apply(this.requestService,params);
	}
	public user_Delete(id:number):AxiosPromise<void>{
		const url = `/api/User/${id}`;
		const params = [url];
		return this.requestService.delete.apply(this.requestService,params);
	}
}
export const apiUserId = new ApiUserId(requestService);
