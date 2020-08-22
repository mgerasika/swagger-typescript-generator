import React from "react";
import {SwaggerMethod, SwaggerMethodParameter} from "../../models";

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export const SwaggerApiMethodArgumentsAdapter = (props: IProps) => {

    return (
        <>
            {props.swaggerMethod.components.renderApiMethodArguments(
                Component, {
                    parameters: props.swaggerMethod.parameters,
                    swaggerMethod: props.swaggerMethod,
                })}
        </>
    );
}


export interface ISwaggerApiMethodArgumentsProps extends IProps {
    parameters: SwaggerMethodParameter[];
}

const Component: React.FC<ISwaggerApiMethodArgumentsProps> = (props) => {
    const requiredArguments = props.parameters.filter(p => p.required);
    const notRequiredArguments = props.parameters.filter(p => !p.required);

    const allArgs = [...requiredArguments, ...notRequiredArguments];
    const requiredArgs = allArgs.map((parameter: SwaggerMethodParameter, index: number) => {
        const isLastArgument = index !== allArgs.length - 1;
        const separator = isLastArgument ? ',' : '';
        const requiredSymbol = parameter.required ? '' : '?';
        const parameterName = parameter.isQueryParameter ? parameter.name + 'Query' : parameter.name;
        return (<span
            key={`${parameter.name}${index}`}>{props.swaggerMethod.utils.escapeMethodQueryParameterName(parameterName)}{requiredSymbol}:{parameter.type}{separator}</span>)
    });

    return (<>{requiredArgs}</>)
}
