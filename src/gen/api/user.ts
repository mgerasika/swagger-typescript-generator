import {AxiosPromise} from 'axios';
import {IRequestService, requestService} from 'swagger-typescript-generator';
import {IUserModel} from '../model';

class ApiUserApi{
	public _requestService:IRequestService; 
	public constructor(service:IRequestService) {
		this._requestService = service; 
	}
	public user_Get():AxiosPromise<IUserModel[]>{
		const url = `/api/User`;
		const params = [url];
		return this._requestService.get.apply(this._requestService,params);
	}
	public user_Post(value:string):AxiosPromise<void>{
		const url = `/api/User`;
		const params = [url,value];
		return this._requestService.post.apply(this._requestService,params);
	}
}
export const apiUserApi = new ApiUserApi(requestService);
