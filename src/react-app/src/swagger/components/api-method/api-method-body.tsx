import React from "react";
import {SwaggerMethodModel} from "../../model/swagger-method";
import {SwaggerMethodParameter} from "../../model";

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
                {formDataParameters.map(param => <React.Fragment key={param.name}>{'\t\t'}formData.append('{param.name}',{param.name}){'\n'}</React.Fragment>)}
            </>);
        }
        return '';
    }

    const getMethodUrlBody = () => {
        const swaggerClass = props.swaggerMethod.parent;
        const result = props.swaggerMethod.url.replace(/{/g, '${');
        return '${this._apiUrl}' + `${result}`;
    }

    const getParams = () => {
        const postArguments = getHttpBodyArguments();
        return postArguments && postArguments.length ? `${postArguments}` : ``;
    }

    const methodName = props.swaggerMethod.isFileUpload ? 'upload' : props.swaggerMethod.httpMethod;
    const params = getParams() ? ' ,' + getParams() : '';
    return (<>
        {'\t\t'}const url = `{getMethodUrlBody()}`;{'\n'}
        {getFormDataScript()}
        {'\t\t'}return di.requestService.{methodName}(url{params});{'\n'}
    </>);
}
