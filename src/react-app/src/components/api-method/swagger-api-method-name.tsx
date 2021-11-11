import React from 'react';
import { SwaggerMethod } from '../../swagger';

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export interface ISwaggerApiMethodNameProps extends IProps {}

export const SwaggerApiMethodNameAdapter: React.FC<ISwaggerApiMethodNameProps> = (props) => {
    const accessor = 'public';
    const methodName = props.swaggerMethod.name;
    return (
        <>
            {accessor} {methodName}
        </>
    );
};
