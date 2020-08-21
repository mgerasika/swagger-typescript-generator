import React from 'react';
import {SwaggerClass, SwaggerDoc, SwaggerEnum, SwaggerModel} from "../models";
import {SwaggerEnumContent} from "./enum";
import {SwaggerModelContent} from "./model";
import {SwaggerApiClassContent} from "./api-class";

interface IProps {
    doc: SwaggerDoc;
}

export const SwaggerAllInOneFileAdapter = (props: IProps) => {
    return (
        <>
            {props.doc.components.renderAllInOneFile(
                Component, {
                    doc: props.doc
                })}
        </>
    );
}

export interface ISwaggerAllInOneFileProps extends IProps {
}

const Component: React.FC<IProps> = (props) => {
    const warning = props.doc ? props.doc.utils.getWarningMessage() : ''

    const allEnumsContent = props.doc.enums.map((swaggerEnum: SwaggerEnum,idx) => {
        return <React.Fragment key={swaggerEnum.name}><SwaggerEnumContent swaggerEnum={swaggerEnum}/>{'\n'}</React.Fragment>;
    });

    const allModelsContent = props.doc.definitions.map((swaggerDefinition: SwaggerModel,dix) => {
        return <React.Fragment key={swaggerDefinition.name}><SwaggerModelContent swaggerModel={swaggerDefinition}/>{'\n'}</React.Fragment>;
    });

    const allClassesContent = props.doc.classes.map((swaggerClass: SwaggerClass) => {
        return <React.Fragment  key={swaggerClass.name}><SwaggerApiClassContent swaggerClass={swaggerClass}/>{'\n'}</React.Fragment>;
    })
    return (
        <>
            {warning}

            {allEnumsContent}
            {'\n'}
            {allModelsContent}
            {'\n'}
            {allClassesContent}
        </>
    );
};


