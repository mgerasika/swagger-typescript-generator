import React from 'react';
import {SwaggerDefinition, SwaggerDefinitionProperty} from '../../model/swagger-definition';
import {SwaggerClass} from '../../model';

interface IProps {
    classes: SwaggerClass[];
}

export const AllApiClassesExportComponent: React.FC<IProps> = (props) => {
    const exports = props.classes.map((def: SwaggerClass) => {
        const name = def.fileName.split('.');
        return (<span key={def.name}>export * from './{name[0]}'{'\n'}</span>);
    });
    return (
        <>
            {exports}
        </>
    );
};


