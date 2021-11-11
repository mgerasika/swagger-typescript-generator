import assert from 'assert';
import React from 'react';
import { SwaggerClass, SwaggerMethod, SwaggerMethodParameter, uniqueItems } from '../../swagger';

interface IProps {
    swaggerClass: SwaggerClass;
}

export const SwaggerApiClassImportAdapter: React.FC<IProps> = (props) => {
    const responseTypes = props.swaggerClass.methods.map((method: SwaggerMethod) => {
        return method.responseModelType?.type && method.responseModelType.modelRef
            ? method.responseModelType.type
            : undefined;
    });

    let parameterTypes: string[] = [];
    props.swaggerClass.methods.forEach((method: SwaggerMethod) => {
        method.parameters.forEach((parameter: SwaggerMethodParameter) => {
            if (parameter.modelType.type && parameter.modelType.modelRef) {
                parameterTypes.push(parameter.modelType.modelRef.name);
            }
        });
    });

    const uniqueMethodParameters = uniqueItems([...responseTypes, ...parameterTypes], (el) => el);

    const imports = ["import {di} from 'swagger-typescript-generator'"];

    const modelNames = uniqueMethodParameters.filter((filter: string | any) => !!filter).join(',');
    if (modelNames.length) {
        assert(
            props.swaggerClass.config.modelImportPath,
            "Model import path can't be empty. Add to config",
        );
        imports.push(
            `import {${modelNames}} from \'${props.swaggerClass.parent.config.modelImportPath}\'`,
        );
    }

    let enumTypes: string[] = [];
    props.swaggerClass.methods.forEach((method: SwaggerMethod) => {
        method.parameters.forEach((parameter: SwaggerMethodParameter) => {
            if (parameter.modelType.type && parameter.modelType.enumRef) {
                enumTypes.push(
                    parameter.modelType.enumRef.namespace
                        ? parameter.modelType.enumRef.namespace
                        : parameter.modelType.enumRef.name,
                );
            }
        });
    });

    const enumNames = uniqueItems(enumTypes, (x) => x)
        .filter((filter: string | any) => !!filter)
        .join(',');
    if (enumNames.length) {
        assert(
            props.swaggerClass.config.enumImportPath,
            "Enum import path can't be empty. Add to config",
        );
        imports.push(
            `import {${enumNames}} from \'${props.swaggerClass.parent.config.enumImportPath}\'`,
        );
    }

    const result = imports.map((val: string) => {
        return (
            <div key={val}>
                {val};{'\n'}
            </div>
        );
    });

    return (
        <>
            {result}
            {'\n'}
        </>
    );
};
