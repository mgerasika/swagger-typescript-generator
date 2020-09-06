import React from 'react';
import {SwaggerDoc, SwaggerEnum} from "../../models";
import {SwaggerWarningMessageAdapter} from "../swagger-warning-message";

interface IProps {
    doc: SwaggerDoc;
    enums: SwaggerEnum[];
}

export const SwaggerAllEnumsExportAdapter = (props: IProps) => {
    return (
        <>
            {props.doc.components.renderAllEnumsExport(
                Component, {
                    doc: props.doc,
                    enums: props.enums,
                })}
        </>
    );
}

export interface ISwaggerAllEnumsExportProps extends IProps {
}

const Component: React.FC<IProps> = (props) => {
    const exports = props.enums.map((def: SwaggerEnum, index) => {
        const idx = def.fileName.lastIndexOf('.');
        const name = def.fileName.substr(0, idx);
        return (<span key={`${def.getFullName}${index}`}>export * from './{name}'{'\n'}</span>);
    });
    return (
        <>
            <SwaggerWarningMessageAdapter doc={props.doc} />
            {exports}
        </>
    );
};


