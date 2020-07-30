import React from "react";
import {SwaggerMethodModel, SwaggerMethodParameter} from "../../model/swagger-method";

interface IProps {
    swaggerMethod: SwaggerMethodModel;
}

export const ApiMethodBodyComponent: React.FC<IProps> = (props) => {
    const getHttpBodyArguments = () => {
        const bodyParameters = props.swaggerMethod.parameters
            .filter((parameter: SwaggerMethodParameter) => parameter.isBodyParameter)
            .map((parameter: SwaggerMethodParameter) => {
                return parameter.name;
            });

        if(props.swaggerMethod.isFileUpload) {
            bodyParameters.push('formData')
        }
        return bodyParameters.join(',');
    }

    const getFormDataScript = () => {
        const formDataParameters = props.swaggerMethod.parameters
            .filter((parameter: SwaggerMethodParameter) => parameter.isFormDataParameter)
            .map((parameter: SwaggerMethodParameter) => parameter);

        if(formDataParameters.length) {
            return (<>
                {'\t\t'}const formData = new FormData();{'\n'}
                {formDataParameters.map(param => <>{'\t\t'}formData.append('{param.name}',{param.name}){'\n'}</>)}
            </>);
        }
        return '';
    }

    const getMethodUrl = () => {
        const swaggerClass = props.swaggerMethod.parent;
        return swaggerClass.url.replace(/{/g, '${');
    }

    const getParams = () => {
        const postArguments = getHttpBodyArguments();
        return postArguments && postArguments.length ? `[url,${postArguments}]` : `[url]`;
    }

    const methodName = props.swaggerMethod.isFileUpload ? 'upload' : props.swaggerMethod.httpMethod;
    return (<>
        {'\t\t'}const url = `{getMethodUrl()}`;{'\n'}
        {getFormDataScript()}
        {'\t\t'}const params = {getParams()};{'\n'}
        {'\t\t'}return this._requestService.{methodName}.apply(this._requestService,params);{'\n'}
    </>);
}
