import React from 'react';
import {SwaggerClassModel} from '../../model/swagger-class';
import {SwaggerMethodModel, SwaggerMethodParameter} from '../../model';

interface IProps {
    swaggerClass: SwaggerClassModel;
}

export const ApiClassImportAdapter: React.FC<IProps> = (props) => {
    const responseTypes = props.swaggerClass.methods.map((method: SwaggerMethodModel) => {
        return method.responseType && props.swaggerClass.utils.isModelByTypeName(method.responseType) ? method.responseType : undefined;
    });

    let parameterTypes: string [] = [];
    props.swaggerClass.methods.forEach((method: SwaggerMethodModel) => {
        method.parameters.forEach((parameter: SwaggerMethodParameter) => {
            if (parameter.type && props.swaggerClass.utils.isModelByTypeName(parameter.type)) {
                parameterTypes.push(parameter.type);
            }
        });
    });

    const unique = [...responseTypes, ...parameterTypes].reduce((it: any, key: any) => {
        if (key) {
            it[key] = key;
        }
        return it;
    }, {});

    const imports = [
        'import {AxiosPromise} from \'axios\'',
        'import {IRequestService, requestService} from \'swagger-typescript-generator\''];

    const result = Object.keys(unique).filter((filter: string | any) => !!filter).join(',');
    if (result.length) {
        imports.push(`import {${result}} from \'${props.swaggerClass.parent.config.modelImportPath}\'`);
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
