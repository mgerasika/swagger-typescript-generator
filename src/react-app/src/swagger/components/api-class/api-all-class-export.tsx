import React from 'react';
import {SwaggerDefinitionModel} from '../../model/swagger-definition-model';
import {SwaggerClassModel} from '../../model';

interface IProps {
    classes: SwaggerClassModel[];
}

export const ApiAllClassesExportComponent: React.FC<IProps> = (props) => {
    const warning = props.classes.length ? props.classes[0].utils.getWarningMessage() : ''
    const exports = props.classes.map((def: SwaggerClassModel) => {
        const idx = def.fileName.lastIndexOf('.');
        const name = def.fileName.substr(0,idx);
        return (<span key={def.name}>export * from './{name}'{'\n'}</span>);
    });
    return (
        <>
            {warning}
            {exports}
        </>
    );
};


