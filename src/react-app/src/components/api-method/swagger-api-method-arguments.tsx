import React from 'react';
import { SwaggerMethod, ISwaggerMethodParameter, EParameterIn } from '../../swagger';

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export interface ISwaggerApiMethodArgumentsProps extends IProps {}

export const SwaggerApiMethodArgumentsAdapter: React.FC<ISwaggerApiMethodArgumentsProps> = (
    props,
) => {
    const requiredArguments = props.swaggerMethod.parameters.filter((p) => p.required);
    const notRequiredArguments = props.swaggerMethod.parameters.filter((p) => !p.required);
    const parameters: ISwaggerMethodParameter[] = [
        ...requiredArguments,
        ...notRequiredArguments,
        {
            required: false,
            name: 'options',
            modelType: { type: 'any' },
            label: 'options',
        } as ISwaggerMethodParameter,
    ].map((p: ISwaggerMethodParameter) => {
        const label = p.in === EParameterIn.query ? p.name + 'Query' : p.name;
        return {
            ...p,
            label: props.swaggerMethod.utils.escapeMethodQueryParameterName(label),
        };
    });

    const result = parameters.map((parameter: ISwaggerMethodParameter, index: number) => {
        const isLastArgument = index !== parameters.length - 1;
        const separator = isLastArgument ? ',' : '';
        const requiredSymbol = parameter.required ? '' : '?';

        return (
            <span key={`${parameter.name}${index}`}>
                {parameter.label}
                {requiredSymbol}:{parameter.modelType.type}
                {separator}
            </span>
        );
    });

    return <>{result}</>;
};
