import React from 'react';
import {SwaggerDefinitionModel} from '../../model/swagger-definition-model';
import {SwaggerEnumModel} from "../../model";

interface IProps {
    enums: SwaggerEnumModel[];
}

export const AllEnumsExportComponent: React.FC<IProps> = (props) => {
    const warning = props.enums.length ? props.enums[0].utils.getWarningMessage() : ''
    const exports = props.enums.map((def: SwaggerEnumModel,index) => {
        const idx = def.fileName.lastIndexOf('.');
        const name = def.fileName.substr(0,idx);
        return (<span key={`${def.name}${index}`}>export * from './{name}'{'\n'}</span>);
    });
    return (
        <>
            {warning}
            {exports}
        </>
    );
};


