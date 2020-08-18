import React from 'react';
import {SwaggerClassModel} from '../../model/swagger-class';
import {SwaggerMethodModel, SwaggerMethodParameter} from '../../model';
import {uniqueItems} from "../../common";

interface IProps {
    swaggerClass: SwaggerClassModel;
}

export const ApiClassImportAdapter: React.FC<IProps> = (props) => {
    const responseTypes = props.swaggerClass.methods.map((method: SwaggerMethodModel) => {
        return method.responseType && method.responseModelRef ? method.responseType : undefined;
    });

    let parameterTypes: string [] = [];
    props.swaggerClass.methods.forEach((method: SwaggerMethodModel) => {
        method.parameters.forEach((parameter: SwaggerMethodParameter) => {
            if (parameter.type && parameter.modelRef) {
                parameterTypes.push(parameter.modelRef.name);
            }
        });
    });


    const uniqueMethodParameters = uniqueItems([...responseTypes, ...parameterTypes], (el) => el);

    const imports = [
        'import {di} from \'swagger-typescript-generator\''];

    const modelNames = uniqueMethodParameters.filter((filter: string | any) => !!filter).join(',');
    if (modelNames.length) {
        imports.push(`import {${modelNames}} from \'${props.swaggerClass.parent.config.modelImportPath}\'`);
    }


    let enumTypes: string [] = [];
    props.swaggerClass.methods.forEach((method: SwaggerMethodModel) => {
        method.parameters.forEach((parameter: SwaggerMethodParameter) => {
            if (parameter.type && parameter.enumRef) {
                enumTypes.push(parameter.enumRef.name);
            }
        });
    });

    const enumNames = uniqueItems(enumTypes, x=>x).filter((filter: string | any) => !!filter).join(',');
    if (enumNames.length) {
        imports.push(`import {${enumNames}} from \'${props.swaggerClass.parent.config.enumImportPath}\'`);
    }

    return (
        <>
            {props.swaggerClass.plugin.apiClassImport(
                ApiClassImportComponent, {
                    swaggerClass: props.swaggerClass,
                    imports
                })}
        </>
    );
};

export interface IApiClassImportProps {
    swaggerClass: SwaggerClassModel;
    imports: string[];
}

export const ApiClassImportComponent: React.FC<IApiClassImportProps> = (props) => {
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
