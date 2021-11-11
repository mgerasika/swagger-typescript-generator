import React from 'react';
import { SwaggerClass, SwaggerDoc } from '../../models';
import { SwaggerWarningMessageAdapter } from '../swagger-warning-message';

interface IProps {
    doc: SwaggerDoc;
    swaggerClasses: SwaggerClass[];
}

export interface ISwaggerAllClassesExportProps extends IProps {}

export const SwaggerAllClassesExportAdapter: React.FC<ISwaggerAllClassesExportProps> = (props) => {
    const exports = props.swaggerClasses.map((def: SwaggerClass) => {
        const idx = def.fileName.lastIndexOf('.');
        const name = def.fileName.substr(0, idx);
        return (
            <span key={def.name}>
                export * from './{name}'{'\n'}
            </span>
        );
    });
    return (
        <>
            <SwaggerWarningMessageAdapter doc={props.doc} />
            {exports}
        </>
    );
};
