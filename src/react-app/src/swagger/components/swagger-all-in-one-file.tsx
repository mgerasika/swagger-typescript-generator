import React from 'react';
import {SwaggerClass, SwaggerDoc, SwaggerEnum, SwaggerModel} from "../models";
import {SwaggerEnumContent} from "./enum";
import {SwaggerModelContent} from "./model";
import {SwaggerApiClassContent} from "./api-class";

interface IProps {
    doc: SwaggerDoc;
}

export const SwaggerAllInOneFileAdapter = (props: IProps) => {
    const imports = [
        'import {di} from \'swagger-typescript-generator\''];

    return (
        <>
            {props.doc.components.renderAllInOneFile(
                Component, {
                    imports: imports,
                    doc: props.doc
                })}
        </>
    );
}

export interface ISwaggerAllInOneFileProps extends IProps {
    imports: string[];
}

const Component: React.FC<ISwaggerAllInOneFileProps> = (props) => {
    const warning = props.doc ? props.doc.utils.getWarningMessage() : ''

    const allEnumsContent = props.doc.enums.map((swaggerEnum: SwaggerEnum, idx) => {
        return <React.Fragment key={swaggerEnum.fullName}><SwaggerEnumContent swaggerEnum={swaggerEnum}/>{'\n'}
        </React.Fragment>;
    });

    const allModelsContent = props.doc.definitions.map((swaggerDefinition: SwaggerModel, dix) => {
        return <React.Fragment key={swaggerDefinition.name}><SwaggerModelContent
            swaggerModel={swaggerDefinition}/>{'\n'}</React.Fragment>;
    });

    const allClassesContent = props.doc.classes.map((swaggerClass: SwaggerClass) => {
        return <React.Fragment key={swaggerClass.name}><SwaggerApiClassContent swaggerClass={swaggerClass}/>{'\n'}
        </React.Fragment>;
    })

    const result = props.imports.map((val: string) => {
        return (<div key={val}>{val};{'\n'}</div>);
    });
    return (
        <>
            {warning}
            {result}
            {'\n'}
            {allEnumsContent}
            {'\n'}
            {allModelsContent}
            {'\n'}
            {allClassesContent}
        </>
    );
};


