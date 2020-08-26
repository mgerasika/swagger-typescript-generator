import React from "react";
import {EParameterType, ISwaggerMethodParameter, SwaggerMethod} from "../../models";

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export const SwaggerApiMethodArgumentsAdapter = (props: IProps) => {
    const requiredArguments = props.swaggerMethod.parameters.filter(p => p.required);
    const notRequiredArguments = props.swaggerMethod.parameters.filter(p => !p.required);
    const allArgs: ISwaggerMethodParameter[] = [...requiredArguments, ...notRequiredArguments, {
        required: false,
        name: 'options',
        type: 'any'
    }].map((p: ISwaggerMethodParameter) => {
        const parameterName = p.parameterType === EParameterType.query ? p.name + 'Query' : p.name;
        return {
            ...p,
            name: parameterName
        }
    });

    return (
        <>
            {props.swaggerMethod.components.renderApiMethodArguments(
                Component, {
                    parameters: allArgs,
                    swaggerMethod: props.swaggerMethod,
                })}
        </>
    );
}

export interface ISwaggerApiMethodArgumentsProps extends IProps {
    parameters: ISwaggerMethodParameter[];
}

const Component: React.FC<ISwaggerApiMethodArgumentsProps> = (props) => {
    const result = props.parameters.map((parameter: ISwaggerMethodParameter, index: number) => {
        const isLastArgument = index !== props.parameters.length - 1;
        const separator = isLastArgument ? ',' : '';
        const requiredSymbol = parameter.required ? '' : '?';

        return (<span key={`${parameter.name}${index}`}>
            {props.swaggerMethod.utils.escapeMethodQueryParameterName(parameter.name)}{requiredSymbol}:{parameter.type}{separator}
        </span>)
    });

    return (<>{result}</>)
}
