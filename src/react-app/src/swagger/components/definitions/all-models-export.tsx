import React from 'react';
import {SwaggerDefinitionModel} from '../../model/swagger-definition-model';

interface IProps {
    definitions: SwaggerDefinitionModel[];
}

export const AllModelsExportComponent: React.FC<IProps> = (props) => {
    const warning = props.definitions.length ? props.definitions[0].utils.getWarningMessage() : ''
    const exports = props.definitions.map((def: SwaggerDefinitionModel) => {
        const idx = def.fileName.lastIndexOf('.');
        const name = def.fileName.substr(0,idx-1);
        return (<span key={def.name}>export * from './{name}'{'\n'}</span>);
    });
    return (
        <>
            {warning}
            {exports}
        </>
    );
};


