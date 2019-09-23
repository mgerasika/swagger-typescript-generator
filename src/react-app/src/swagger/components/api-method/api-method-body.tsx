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
        return bodyParameters.join(',');
    }

    const getMethodUrl = () => {
        const swaggerClass = props.swaggerMethod.parent;
        return swaggerClass.url.replace(/{/g, '${');
    }

    const getParams = () => {
        const postArguments = getHttpBodyArguments();
        return postArguments && postArguments.length ? `[url,${postArguments}]` : `[url]`;
    }

    return (<>
        {'\t\t'}const url = `{getMethodUrl()}`;{'\n'}
        {'\t\t'}const params = {getParams()};{'\n'}
        {'\t\t'}return this._requestService.{props.swaggerMethod.httpMethod}.apply(this._requestService,params);{'\n'}
    </>);
}
