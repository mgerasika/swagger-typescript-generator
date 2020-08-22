import React from 'react';
import {SwaggerModel} from '../../models/swagger-model';
import {SwaggerModelImportAdapter} from "./swagger-model-import";
import {SwaggerModelContent} from "./swagger-model-content";

interface IProps {
    swaggerModel: SwaggerModel;
}

export const SwaggerModelAdapter = (props: IProps) => {
    return (
        <>
            {props.swaggerModel.components.renderModel(
                Component, {
                    swaggerModel: props.swaggerModel,
                })}
        </>
    );
}


export interface ISwaggerModelProps extends IProps {
}

const Component: React.FC<IProps> = (props) => {
    return (
        <>
            {props.swaggerModel.utils.getWarningMessage()}
            <SwaggerModelImportAdapter swaggerModel={props.swaggerModel}/>

            <SwaggerModelContent swaggerModel={props.swaggerModel}/>
        </>
    );
};


