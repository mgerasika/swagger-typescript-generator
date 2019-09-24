import React from 'react';
import {SwaggerDefinitionModel, SwaggerDefinitionProperty} from '../../model/swagger-definition-model';
import {SwaggerClassModel} from '../../model';
import {Warning} from '../../utils';

interface IProps {
    classes: SwaggerClassModel[];
}

export const ApiAllClassesExportComponent: React.FC<IProps> = (props) => {
    const exports = props.classes.map((def: SwaggerClassModel) => {
        const name = def.fileName.split('.');
        return (<span key={def.name}>export * from './{name[0]}'{'\n'}</span>);
    });
    return (
        <>
            {Warning}
            {exports}
        </>
    );
};


