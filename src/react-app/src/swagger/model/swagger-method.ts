import {parentSymbol, sourceSymbol} from '../utils';
import {SwaggerClassModel} from './swagger-class';
import {IUrlInfo} from './url-info';
import {getResponseIsArray, getIsEnum} from "../common";
import {SwaggerDefinitionModel} from "./swagger-definition-model";
import {SwaggerEnumModel} from "./swagger-enum";
import {SwaggerModelBase} from "./swagger-model-base";
import {SwaggerMethodParameter} from "./swagger-method-parameter";

export class SwaggerMethodModel extends SwaggerModelBase<SwaggerClassModel>{
    public httpMethod: string = '';
    public name: string = '';
    public tags: string = '';
    public url : string = '';
    public parameters: SwaggerMethodParameter[] = [];
    public responseIsVoid?: boolean;
    public responseIsArray?: boolean;
    public responseType?: string;
    public isFileUpload?: boolean;
    public description?:string;

    public get responseModelRef():SwaggerDefinitionModel {
        return this.getPrivateValue('responseModelRef') as SwaggerDefinitionModel;
    }
    public set responseModelRef(val:SwaggerDefinitionModel) {
        this.setPrivateValue('responseModelRef',val) ;
    }

    public constructor(parent: SwaggerClassModel, httpMethod: string, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.httpMethod = httpMethod;
        [this.tags] = this.source.tags;
        this.name = this.utils.getMethodName(this,this.source.operationId);

        if (source.parameters) {
            this.parameters = source.parameters.map((obj: any) => {
                return new SwaggerMethodParameter(this, obj);
            });
        }

        this.responseIsVoid = true;
        if (source.responses && source.responses['200']) {
            this.responseIsVoid = false;
            const schema = source.responses['200'].schema;
            if (schema) {
                this.responseIsArray = getResponseIsArray(schema);
                this.responseType = this.utils.getMethodResponseType(this,schema);
            }
        }
        this.isFileUpload = this.parameters.some(s=>s.type === 'File');
        if(source.summary) {
            this.description = source.summary;
        }
    }

    public init(){
        this.parameters.forEach(p=>p.init());

        const responseModel = this.doc.definitions.find(f=>f.name === this.responseType);
        if(responseModel) {
            this.responseModelRef = responseModel;
            this.responseType = responseModel.name;
        }
    }

    public getUrlInfo(): IUrlInfo {
        return {
            httpMethod: this.httpMethod,
            name: this.name,
            url: this.url
        };
    }

}