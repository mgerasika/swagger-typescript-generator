import React from "react";
import {SwaggerMethod} from "../../models/swagger-method";
import {EParameterType, SwaggerMethodParameter} from "../../models";

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export const SwaggerApiMethodBodyAdapter = (props: IProps) => {
    const getRequestServiceParams = ():string[] => {
        const result = props.swaggerMethod.parameters
            .filter((parameter: SwaggerMethodParameter) => parameter.parameterType === EParameterType.body)
            .map((parameter: SwaggerMethodParameter) => {
                return parameter.name;
            });

        if (props.swaggerMethod.isFileUpload) {
            result.push('formData');
        }
        result.unshift('url');
        result.push('options')
        return result;
    }

    return (
        <>
            {props.swaggerMethod.components.renderApiMethodBody(
                Component, {
                    requestServiceParams: getRequestServiceParams(),
                    swaggerMethod: props.swaggerMethod,
                })}
        </>
    );
}

export interface ISwaggerApiMethodBodyProps extends IProps {
    requestServiceParams:string[];
}

const Component: React.FC<ISwaggerApiMethodBodyProps> = (props) => {
    const getFormDataScript = () => {
        const formDataParameters = props.swaggerMethod.parameters
            .filter((parameter: SwaggerMethodParameter) => parameter.parameterType === EParameterType.formData)
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
        const queryArguments = props.swaggerMethod.parameters.filter(p => p.parameterType === EParameterType.query);
        const query = queryArguments.map(query => `'${query.name}':${props.swaggerMethod.utils.escapeMethodQueryParameterName(query.name)}Query`).join(',');
        return `di.utilsService.toQueryString({${query}})`;
    }

    const methodName = props.swaggerMethod.isFileUpload ? 'upload' : props.swaggerMethod.httpMethod;
    const hasQueryParameters = props.swaggerMethod.parameters.some(p => p.parameterType === EParameterType.query);

    return (<>
        {hasQueryParameters && <> {'\t\t'}const queryStr = {getQueryBody()};{'\n'}</>}
        {hasQueryParameters ?
        <>{'\t\t'}const url = di.utilsService.combineUrlAndQuery(`{getUrlBody()}`,queryStr);{'\n'}</> :
        <>{'\t\t'}const url = `{getUrlBody()}`;{'\n'}</>}
        {getFormDataScript()}
        {<>{'\t\t'}return di.requestService.{methodName}({props.requestServiceParams.join(',')});</>}
    </>);
}
