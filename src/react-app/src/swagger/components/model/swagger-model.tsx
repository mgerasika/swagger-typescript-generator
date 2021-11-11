import React from 'react';
import { SwaggerModel } from '../../models/swagger-model';
import { SwaggerModelImportAdapter } from './swagger-model-import';
import { SwaggerModelContent } from './swagger-model-content';
import { SwaggerWarningMessageAdapter } from '../swagger-warning-message';

interface IProps {
    swaggerModel: SwaggerModel;
}

export interface ISwaggerModelProps extends IProps {}

export const SwaggerModelAdapter: React.FC<IProps> = (props) => {
    return (
        <>
            <SwaggerWarningMessageAdapter doc={props.swaggerModel.doc} />
            <SwaggerModelImportAdapter swaggerModel={props.swaggerModel} />

            <SwaggerModelContent swaggerModel={props.swaggerModel} />
        </>
    );
};
