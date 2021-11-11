import React from 'react';
import { SwaggerModelContent } from './model';
import { SwaggerApiClassContent } from './api-class';
import { SwaggerEnumContentAdapter } from './enum';
import { SwaggerWarningMessageAdapter } from './swagger-warning-message';
import { SwaggerClass, SwaggerDoc, SwaggerEnum, SwaggerModel, uniqueItems } from '../swagger';
import { Namespace } from './namespace';

interface IProps {
    doc: SwaggerDoc;
}

export interface ISwaggerAllInOneFileProps extends IProps {}

const renderEnums = (tabCount: number, enums: SwaggerEnum[]) => {
    return enums.map((swaggerEnum: SwaggerEnum, idx) => {
        return (
            <React.Fragment key={swaggerEnum.getFullName}>
                <SwaggerEnumContentAdapter tabCount={tabCount} swaggerEnum={swaggerEnum} />
                {'\n'}
            </React.Fragment>
        );
    });
};

export const SwaggerAllInOneFileAdapter: React.FC<ISwaggerAllInOneFileProps> = (props) => {
    const imports = ["import {di} from 'swagger-typescript-generator'"];
    const enumNamespaces = uniqueItems(
        props.doc.enums.map((e) => e.namespace).filter((f) => f),
        (x) => x,
    );

    const allEnumsWithNamespace = enumNamespaces.map((namespace, idx) => {
        const enums = props.doc.enums.filter((en) => en.namespace === namespace);
        return (
            <React.Fragment key={namespace}>
                <Namespace name={namespace as string}>{renderEnums(1, enums)}</Namespace>
            </React.Fragment>
        );
    });

    const allEnumsWithoutNamespace = renderEnums(
        0,
        props.doc.enums.filter((f) => !f.namespace),
    );

    const allModelsContent = props.doc.models.map((swaggerDefinition: SwaggerModel, dix) => {
        return (
            <React.Fragment key={swaggerDefinition.name}>
                <SwaggerModelContent swaggerModel={swaggerDefinition} />
                {'\n'}
            </React.Fragment>
        );
    });

    const allClassesContent = props.doc.classes.map((swaggerClass: SwaggerClass) => {
        return (
            <React.Fragment key={swaggerClass.name}>
                <SwaggerApiClassContent swaggerClass={swaggerClass} />
                {'\n'}
            </React.Fragment>
        );
    });

    const result = imports.map((val: string) => {
        return (
            <div key={val}>
                {val};{'\n'}
            </div>
        );
    });
    return (
        <>
            <SwaggerWarningMessageAdapter doc={props.doc} />
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
