import React from 'react';
import {SwaggerModel} from '../../models/swagger-model';
import {SwaggerDoc} from "../../models";
import {SwaggerWarningMessageAdapter} from "../swagger-warning-message";

interface IProps {
    doc: SwaggerDoc;
    models: SwaggerModel[];
}

export const SwaggerAllModelsExportAdapter = (props: IProps) => {
    return (
        <>
            {props.doc.components.renderAllModelsExport(
                Component, {
                    doc: props.doc,
                    models: props.models,
                })}
        </>
    );
}

export interface ISwaggerAllModelsExportProps extends IProps {
}

const Component: React.FC<IProps> = (props) => {
    const exports = props.models.map((def: SwaggerModel, index) => {
        const idx = def.fileName.lastIndexOf('.');
        const name = def.fileName.substr(0, idx);
        return (<span key={`${def.name}${index}`}>export * from './{name}'{'\n'}</span>);
    });
    return (
        <>
            <SwaggerWarningMessageAdapter doc={props.doc} />
            {exports}
        </>
    );
};


