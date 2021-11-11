import React from 'react';
import { SwaggerClass } from '../../models/swagger-class';

interface IProps {
    swaggerClass: SwaggerClass;
}

export interface ISwaggerApiClassConstructorProps extends IProps {}

export const SwaggerApiClassConstructorAdapter: React.FC<ISwaggerApiClassConstructorProps> = (
    props,
) => {
    const lines = ['this._apiUrl = apiUrl'];
    const constructorArguments = ['apiUrl:string'];

    const bodyLines = lines.map((bl) => (
        <React.Fragment key={bl}>
            {'\t\t'}
            {bl}
            {';\n'}
        </React.Fragment>
    ));
    return (
        <>
            {'\t'}public constructor(<>{constructorArguments.join(',')}</>) {'{\n'}
            {bodyLines}
            {'\t}\n'}
        </>
    );
};
