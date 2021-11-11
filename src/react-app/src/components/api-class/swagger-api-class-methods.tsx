import React from 'react';
import { SwaggerClass, SwaggerMethod } from '../../swagger';
import { SwaggerApiMethodAdatper } from '../api-method/swagger-api-method';

interface IProps {
    swaggerClass: SwaggerClass;
}

export interface ISwaggerApiClassMethodProps extends IProps {}

export const SwaggerApiClassMethodsAdapter: React.FC<ISwaggerApiClassMethodProps> = (props) => {
    const methods = props.swaggerClass.methods.map((method: SwaggerMethod) => {
        return <SwaggerApiMethodAdatper key={method.name} swaggerMethod={method} />;
    });

    return <>{methods}</>;
};
