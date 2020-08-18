import React from 'react';
import {SwaggerDefinitionModel} from '../../model/swagger-definition-model';
import {DefinitionImportComponent} from "./definition-import";
import {SwaggerDefinitionProperty} from "../../model";

interface IProps {
    definition: SwaggerDefinitionModel;
}

export const ModelDefinitionComponent: React.FC<IProps> = (props) => {
    const fields = props.definition.properties.map((parameter: SwaggerDefinitionProperty) => {
        const type = parameter.isArray ? `${parameter.type}[]` : parameter.type;
        const required = parameter.required ? "" : "?";
        return (<span key={parameter.name}>{'\t'}{parameter.name}{required}:{type}{'\n'}</span>);
    });

    return (
        <>
            {props.definition.utils.getWarningMessage()}
            <DefinitionImportComponent swaggerDefinition={props.definition} />

            export interface {props.definition.name}
            {'{'} {'\n'}{fields}
            {'}'}
        </>
    );
};


