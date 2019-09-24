import React from 'react';
import {SwaggerDefinitionModel, SwaggerDefinitionProperty} from '../../model/swagger-definition-model';
import {isModelByTypeName, Warning} from '../../utils';

interface IProps {
    definition: SwaggerDefinitionModel;
}

export const ModelDefinitionComponent: React.FC<IProps> = (props) => {
    const fields = props.definition.properties.map((parameter: SwaggerDefinitionProperty) => {
        const type = parameter.isArray ? `${parameter.type}[]` : parameter.type;
        return (<span key={parameter.name}>{'\t'}{parameter.name}:{type}{'\n'}</span>);
    });

    const types = props.definition.properties.map((parameter: SwaggerDefinitionProperty) => {
        return isModelByTypeName(parameter.type) ? parameter.type : undefined;
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
            {Warning}
            {result}
            export interface {props.definition.name}
            {'{'} {'\n'}{fields}
            {'}'}
        </>
    );
};


