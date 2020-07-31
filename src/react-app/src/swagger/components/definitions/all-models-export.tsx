import React from 'react';
import {SwaggerDefinitionModel, SwaggerDefinitionProperty} from '../../model/swagger-definition-model';

interface IProps {
    definitions: SwaggerDefinitionModel[];
}

export const AllModelsExportComponent: React.FC<IProps> = (props) => {
    const warning = props.definitions.length ? props.definitions[0].utils.getWarningMessage() : ''
    const exports = props.definitions.map((def: SwaggerDefinitionModel) => {
        const name = def.fileName.split('.');
        return (<span key={def.name}>export * from './{name[0]}'{'\n'}</span>);
    });
    return (
        <>
            {warning}
            {exports}
        </>
    );
};


