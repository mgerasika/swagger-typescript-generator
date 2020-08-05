import React from 'react';
import {SwaggerDefinitionModel, SwaggerDefinitionProperty} from '../../model/swagger-definition-model';
import {DefinitionImportComponent} from "./definition-import";

interface IProps {
    definition: SwaggerDefinitionModel;
}

export const ModelDefinitionComponent: React.FC<IProps> = (props) => {
    const fields = props.definition.properties.map((parameter: SwaggerDefinitionProperty) => {
        const type = parameter.isArray ? `${parameter.type}[]` : parameter.type;
        const required = parameter.required ? "" : "?";
        return (<span key={parameter.name}>{'\t'}{parameter.name}{required}:{type}{'\n'}</span>);
    });

    const types = props.definition.properties.map((parameter: SwaggerDefinitionProperty) => {
        return parameter.enumModelRef ? parameter.type : undefined;
    }).filter((filter: string | any) => !!filter && filter != props.definition.name).join(',');

    const imports = [];
    if (types.length) {
        imports.push(`import {${types}} from \'${props.definition.parent.config.modelImportPath}\'`);
    }

    const result = imports.map((val: string) => {
        return (<div key={val}>{val};{'\n'}</div>);
    });

    return (
        <>
            {props.definition.utils.getWarningMessage()}
            <DefinitionImportComponent swaggerDefinition={props.definition} />
            {result}
            export interface {props.definition.name}
            {'{'} {'\n'}{fields}
            {'}'}
        </>
    );
};


