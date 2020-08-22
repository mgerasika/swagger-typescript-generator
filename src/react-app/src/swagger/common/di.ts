import {IRequestService} from "../common-client-only/request-service";
import {dependencyInjection} from "../common-client-only/dependency-injection";
import {IUtilsService} from "./utils-service";

export class DependencyInjectionHelper {
    public get requestService(): IRequestService {
        return dependencyInjection.get('IRequestService');
    }

    public get utilsService(): IUtilsService {
        return dependencyInjection.get('IUtilsService');
    }
}

export const di = new DependencyInjectionHelper();