import React from 'react';
import {SwaggerClass} from '../../models/swagger-class';
import {SwaggerMethod, SwaggerMethodParameter} from '../../models';
import {assert, uniqueItems} from "../../common";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const SwaggerApiClassImportAdapter: React.FC<IProps> = (props) => {
    const responseTypes = props.swaggerClass.methods.map((method: SwaggerMethod) => {
        return method.responseModelType?.type && method.responseModelRef ? method.responseModelType.type : undefined;
    });

    let parameterTypes: string [] = [];
    props.swaggerClass.methods.forEach((method: SwaggerMethod) => {
        method.parameters.forEach((parameter: SwaggerMethodParameter) => {
            if (parameter.modelType.type && parameter.modelRef) {
                parameterTypes.push(parameter.modelRef.name);
            }
        });
    });


    const uniqueMethodParameters = uniqueItems([...responseTypes, ...parameterTypes], (el) => el);

    const imports = [
        'import {di} from \'swagger-typescript-generator\''];

    const modelNames = uniqueMethodParameters.filter((filter: string | any) => !!filter).join(',');
    if (modelNames.length) {
        assert(props.swaggerClass.config.modelImportPath, "Model import path can't be empty. Add to config")
        imports.push(`import {${modelNames}} from \'${props.swaggerClass.parent.config.modelImportPath}\'`);
    }


    let enumTypes: string [] = [];
    props.swaggerClass.methods.forEach((method: SwaggerMethod) => {
        method.parameters.forEach((parameter: SwaggerMethodParameter) => {
            if (parameter.modelType.type && parameter.enumRef) {
                enumTypes.push(parameter.enumRef.namespace ? parameter.enumRef.namespace : parameter.enumRef.name);
            }
        });
    });

    const enumNames = uniqueItems(enumTypes, x => x).filter((filter: string | any) => !!filter).join(',');
    if (enumNames.length) {
        assert(props.swaggerClass.config.enumImportPath, "Enum import path can't be empty. Add to config")
        imports.push(`import {${enumNames}} from \'${props.swaggerClass.parent.config.enumImportPath}\'`);
    }

    return (
        <>
            {props.swaggerClass.components.renderApiClassImport(
                Component, {
                    swaggerClass: props.swaggerClass,
                    imports
                })}
        </>
    );
};

export interface ISwaggerApiClassImportComponentProps extends IProps {
    imports: string[];
}

const Component: React.FC<ISwaggerApiClassImportComponentProps> = (props) => {
    const result = props.imports.map((val: string) => {
        return (<div key={val}>{val};{'\n'}</div>);
    });

    return (
        <>
            {result}
            {'\n'}
        </>
    );
};
