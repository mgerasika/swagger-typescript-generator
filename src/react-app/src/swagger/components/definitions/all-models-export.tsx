import React from 'react';
import {SwaggerDefinition, SwaggerDefinitionProperty} from '../../model/swagger-definition';

interface IProps {
    definitions: SwaggerDefinition[];
}

export const AllModelsExportComponent: React.FC<IProps> = (props) => {
    const exports = props.definitions.map((def: SwaggerDefinition) => {
        return (<span key={def.name}>export * from './{def.fileName}'{'\n'}</span>);
    });
    return (
        <>
            {exports}
        </>
    );
};


