import React from 'react';
import { SwaggerClass } from '../../models/swagger-class';
import { SwaggerApiClassImportAdapter } from './swagger-api-class-import';
import { SwaggerApiClassContent } from './swagger-api-class-content';
import { SwaggerWarningMessageAdapter } from '../swagger-warning-message';

interface IProps {
    swaggerClass: SwaggerClass;
}

export interface ISwaggerApiClassProps extends IProps {}

export const SwaggerApiClassAdapter: React.FC<ISwaggerApiClassProps> = (props) => {
    const { swaggerClass } = props;

    return (
        <>
            <SwaggerWarningMessageAdapter doc={swaggerClass.doc} />
            <SwaggerApiClassImportAdapter swaggerClass={props.swaggerClass} />

            <SwaggerApiClassContent swaggerClass={props.swaggerClass} />
        </>
    );
};
