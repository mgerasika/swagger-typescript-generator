import React from 'react';
import {SwaggerDefinition, SwaggerDefinitionProperty} from '../../model/swagger-definition';
import {SwaggerClass} from '../../model';

interface IProps {
    classes: SwaggerClass[];
}

export const AllApiClassesExportComponent: React.FC<IProps> = (props) => {
    const exports = props.classes.map((def: SwaggerClass) => {
        return (<span key={def.name}>export * from './{def.fileName}'{'\n'}</span>);
    });
    return (
        <>
            {exports}
        </>
    );
};


