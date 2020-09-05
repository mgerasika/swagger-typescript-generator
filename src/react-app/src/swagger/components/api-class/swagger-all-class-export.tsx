import React from 'react';
import {SwaggerClass, SwaggerDoc} from '../../models';
import {SwaggerWarningMessageAdapter} from "../swagger-warning-message";

interface IProps {
    doc: SwaggerDoc;
    swaggerClasses: SwaggerClass[];
}

export const SwaggerAllClassesExportAdapter = (props: IProps) => {
    return (
        <>
            {props.doc.components.renderAllClassesExport(
                Component, {
                    doc: props.doc,
                    swaggerClasses: props.swaggerClasses,
                })}
        </>
    );
}

export interface ISwaggerAllClassesExportProps extends IProps {
}

const Component: React.FC<ISwaggerAllClassesExportProps> = (props) => {
    const exports = props.swaggerClasses.map((def: SwaggerClass) => {
        const idx = def.fileName.lastIndexOf('.');
        const name = def.fileName.substr(0, idx);
        return (<span key={def.name}>export * from './{name}'{'\n'}</span>);
    });
    return (
        <>
            <SwaggerWarningMessageAdapter doc={props.doc} />
            {exports}
        </>
    );
};


