import React from 'react';
import {SwaggerDefinitionModel, SwaggerDefinitionProperty} from '../../model/swagger-definition-model';

interface IProps {
    definition: SwaggerDefinitionModel;
}

export const ModelDefinitionComponent: React.FC<IProps> = (props) => {
    const fields = props.definition.properties.map((parameter: SwaggerDefinitionProperty) => {
        return (<span key={parameter.name}>{'\t'}{parameter.name}:{parameter.type}{'\n'}</span>);
    });
    return (
        <>
            export interface {props.definition.name}
            {'{'} {'\n'}{fields}
            {'}'}
        </>
    );
};


