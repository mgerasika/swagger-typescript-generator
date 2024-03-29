import React from 'react';
import { SwaggerClass } from '../../swagger';

interface IProps {
    swaggerClass: SwaggerClass;
}

export interface ISwaggerApiClassFieldsProps extends IProps {}

export const SwaggerApiClassFieldsAdapter: React.FC<ISwaggerApiClassFieldsProps> = (props) => {
    return (
        <>
            {'\t'}private _apiUrl:string; {'\n'}
        </>
    );
};
