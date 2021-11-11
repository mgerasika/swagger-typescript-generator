import React from 'react';
import { SwaggerApiMethodReturnTypeAdapter } from './swagger-api-method-return-type';
import { SwaggerApiMethodArgumentsAdapter } from './swagger-api-method-arguments';
import { SwaggerApiMethodBodyAdapter } from './swagger-api-method-body';
import { SwaggerApiMethodNameAdapter } from './swagger-api-method-name';
import { SwaggerMethod } from '../../swagger';

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export interface ISwaggerApiMethodProps extends IProps {}

export const SwaggerApiMethodAdatper: React.FC<IProps> = (props) => {
    return (
        <>
            {'\t'}
            <SwaggerApiMethodNameAdapter swaggerMethod={props.swaggerMethod} />(
            <SwaggerApiMethodArgumentsAdapter swaggerMethod={props.swaggerMethod} />)
            <SwaggerApiMethodReturnTypeAdapter swaggerMethod={props.swaggerMethod} />
            {'{\n'}
            <SwaggerApiMethodBodyAdapter swaggerMethod={props.swaggerMethod} />
            {'\n\t}\n'}
        </>
    );
};
