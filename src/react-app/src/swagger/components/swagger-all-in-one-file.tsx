import React from 'react';
import {SwaggerClass, SwaggerDoc, SwaggerEnum, SwaggerModel} from "../models";
import {SwaggerModelContent} from "./model";
import {SwaggerApiClassContent} from "./api-class";
import {uniqueItems} from "../utils";
import {Namespace} from "../namespace";
import {SwaggerEnumContentAdapter} from "./enum";

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

const renderEnums = (tabCount:number,enums:SwaggerEnum[]) => {
    return enums.map((swaggerEnum: SwaggerEnum, idx) => {
        return <React.Fragment key={swaggerEnum.fullName}><SwaggerEnumContentAdapter tabCount={tabCount} swaggerEnum={swaggerEnum}/>{'\n'}
        </React.Fragment>;
    })
}

const Component: React.FC<ISwaggerAllInOneFileProps> = (props) => {
    const warning = props.doc ? props.doc.utils.getWarningMessage() : ''

    const enumNamespaces = uniqueItems(props.doc.enums.map(e => e.namespace).filter(f=>f),x=>x);

    const allEnumsWithNamespace = enumNamespaces.map((namespace, idx) => {
        const enums = props.doc.enums.filter(en=>en.namespace === namespace);
        return <React.Fragment key={namespace}>
            <Namespace name={namespace as string}>
                {renderEnums(1,enums)}
            </Namespace>
        </React.Fragment>;
    });

    const allEnumsWithoutNamespace = renderEnums(0,props.doc.enums.filter(f=>!f.namespace));


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
            {allClassesContent}
            {'\n'}
            {allModelsContent}
            {'\n'}
            {allEnumsWithNamespace}
            {'\n'}
            {allEnumsWithoutNamespace}
        </>
    );
};


