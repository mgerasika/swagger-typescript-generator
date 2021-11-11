import React from 'react';
import { SwaggerMethod } from '../../models/swagger-method';

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export interface ISwaggerApiMethodReturnTypeProps extends IProps {}

export const SwaggerApiMethodReturnTypeAdapter: React.FC<ISwaggerApiMethodReturnTypeProps> = (
    props,
) => {
    const getReturnType = () => {
        if (props.swaggerMethod.responseIsVoid) {
            return 'Promise<void>';
        }
        const arraySymbol = props.swaggerMethod.responseModelType.isArray ? '[]' : '';
        return `Promise<${props.swaggerMethod.responseModelType?.type}${arraySymbol}>`;
    };
    const returnType = getReturnType();
    return returnType ? <>:{returnType}</> : null;
};
