import React from 'react';
import {SwaggerModel} from '../../models/swagger-model';
import {SwaggerModelProperty} from "../../models";
import {Comment} from "../api-class";

interface IProps {
    swaggerModel: SwaggerModel;
}

export const SwaggerModelContent: React.FC<IProps> = (props) => {
    const fields = props.swaggerModel.properties.map((parameter: SwaggerModelProperty) => {
        const required = parameter.required ? "" : "?";
        return (<React.Fragment key={parameter.name}>
            {props.swaggerModel.doc.config.showComments && parameter.description && parameter.description !== parameter.name &&
            <span>{'\t'}<Comment commment={parameter.description}/>{'\n'}</span>}
            <span>{'\t'}'{parameter.name}'{required}:{parameter.modelType.type};{'\n'}</span>
        </React.Fragment>);
    });

    return (
        <>
            export class {props.swaggerModel.name}{' {\n'}
            {fields}
            {'}'}
        </>
    );
};


