import {IRequestService} from "./request-service";
import {dependencyInjection} from "./dependency-injection";
import {IUtilsService} from "./utils-service";

export class DependencyInjectionHelper {
    public get(name: string) {
        return dependencyInjection.get(name);
    }

    public get requestService(): IRequestService {
        return dependencyInjection.get('IRequestService');
    }

    public get utilsService(): IUtilsService {
        return dependencyInjection.get('IUtilsService');
    }
}

export const di = new DependencyInjectionHelper();