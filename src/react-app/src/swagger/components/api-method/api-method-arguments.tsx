import React from "react";
import {SwaggerMethodModel} from "../../model/swagger-method";
import {SwaggerMethodParameter} from "../../model";

interface IProps {
    swaggerMethod: SwaggerMethodModel;
}

export const ApiMethodArgumentsComponent: React.FC<IProps> = (props) => {
    const result = props.swaggerMethod.parameters.map((parameter: SwaggerMethodParameter, index: number) => {
        const isLastArgument = index !== props.swaggerMethod.parameters.length - 1;
        const separator = isLastArgument ? ',' : ''
        return (<span key={parameter.name}>{parameter.name}:{parameter.type}{separator}</span>)
    });
    return (<>{result}</>);
}
