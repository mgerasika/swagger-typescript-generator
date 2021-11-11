import React from 'react';
import { SwaggerClass } from '../../swagger';

interface IProps {
    swaggerClass: SwaggerClass;
}

export interface ISwaggerApiClassNameProps extends IProps {}

export const SwaggerApiClassNameAdapter: React.FC<ISwaggerApiClassNameProps> = (props) => {
    return <>export class {props.swaggerClass.name}</>;
};
