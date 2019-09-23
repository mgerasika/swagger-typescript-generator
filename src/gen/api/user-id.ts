import {AxiosPromise} from 'axios';
import {IRequestService, requestService} from 'swagger-typescript-generator';
import {IUserModel} from '../model';

class ApiUserIdApi{
	public _requestService:IRequestService; 
	public constructor(service:IRequestService) {
		this._requestService = service; 
	}
	public user_Get(id:number):AxiosPromise<IUserModel>{
		const url = `/api/User/${id}`;
		const params = [url];
		return this._requestService.get.apply(this._requestService,params);
	}
	public user_Put(id:number,value:string):AxiosPromise<void>{
		const url = `/api/User/${id}`;
		const params = [url,value];
		return this._requestService.put.apply(this._requestService,params);
	}
	public user_Delete(id:number):AxiosPromise<void>{
		const url = `/api/User/${id}`;
		const params = [url];
		return this._requestService.delete.apply(this._requestService,params);
	}
}
export const apiUserIdApi = new ApiUserIdApi(requestService);
