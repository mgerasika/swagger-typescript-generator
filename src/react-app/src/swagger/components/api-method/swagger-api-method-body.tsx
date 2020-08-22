import React from "react";
import {SwaggerMethod} from "../../models/swagger-method";
import {SwaggerMethodParameter} from "../../models";

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export const SwaggerApiMethodBodyAdapter = (props: IProps) => {
    return (
        <>
            {props.swaggerMethod.components.renderApiMethodBody(
                Component, {
                    swaggerMethod: props.swaggerMethod,
                })}
        </>
    );
}

export interface ISwaggerApiMethodBodyProps extends IProps {
}

const Component: React.FC<IProps> = (props) => {
    const getHttpBodyArguments = () => {
        const bodyParameters = props.swaggerMethod.parameters
            .filter((parameter: SwaggerMethodParameter) => parameter.isBodyParameter)
            .map((parameter: SwaggerMethodParameter) => {
                return parameter.name;
            });

        if (props.swaggerMethod.isFileUpload) {
            bodyParameters.push('formData')
        }
        return bodyParameters.join(',');
    }

    const getFormDataScript = () => {
        const formDataParameters = props.swaggerMethod.parameters
            .filter((parameter: SwaggerMethodParameter) => parameter.isFormDataParameter)
            .map((parameter: SwaggerMethodParameter) => parameter);

        if (formDataParameters.length) {
            return (<>
                {'\t\t'}const formData = new FormData();{'\n'}
                {formDataParameters.map(param => <React.Fragment
                    key={param.name}>{'\t\t'}formData.append('{param.name}',{param.name}){'\n'}</React.Fragment>)}
            </>);
        }
        return '';
    }

    const getUrlBody = () => {
        const swaggerClass = props.swaggerMethod.parent;
        const result = props.swaggerMethod.url.replace(/{/g, '${');
        return '${this._apiUrl}' + `${result}`;
    }
    const getQueryBody = () => {
        const queryArguments = props.swaggerMethod.parameters.filter(p => p.isQueryParameter);
        const query = queryArguments.map(query => `'${query.name}':${props.swaggerMethod.utils.escapeMethodQueryParameterName(query.name)}Query`).join(',');
        return `di.utilsService.toQueryString({${query}})`;
    }

    const getParams = () => {
        const postArguments = getHttpBodyArguments();
        return postArguments && postArguments.length ? `${postArguments}` : ``;
    }

    const methodName = props.swaggerMethod.isFileUpload ? 'upload' : props.swaggerMethod.httpMethod;
    const params = getParams() ? ' ,' + getParams() : '';
    const hasQueryParameters = props.swaggerMethod.parameters.some(p => p.isQueryParameter);
    return (<>
        {hasQueryParameters && <> {'\t\t'}const queryStr = {getQueryBody()};{'\n'}</>}
        {'\t\t'}const url = `{getUrlBody()}`;{'\n'}
        {getFormDataScript()}
        {hasQueryParameters ? <>
            {'\t\t'}return di.requestService.{methodName}(di.utilsService.combineUrlAndQuery(url,queryStr){params});
        </> : <>{'\t\t'}return di.requestService.{methodName}(url{params});</>}
    </>);
}
