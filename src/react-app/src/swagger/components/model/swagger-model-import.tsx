import React from 'react';
import { SwaggerModel } from '../../models';
import { assert, uniqueItems } from '../../common';

interface IProps {
    swaggerModel: SwaggerModel;
}

export interface ISwaggerModelImportProps extends IProps {}

export const SwaggerModelImportAdapter: React.FC<IProps> = (props) => {
    // const types = props.definition.properties.map((parameter: SwaggerDefinitionProperty) => {
    //     return parameter.enumModelRef ? parameter.type : undefined;
    // }).filter((filter: string | any) => !!filter && filter != props.definition.name).join(',');
    //
    // const imports = [];
    // if (types.length) {
    //     imports.push(`import {${types}} from \'${props.definition.parent.config.modelImportPath}\'`);
    // }
    //
    // const result = imports.map((val: string) => {
    //     return (<div key={val}>{val};{'\n'}</div>);
    // });
    const imports = [];

    const enums = props.swaggerModel.properties.filter((f) => f.modelType.isEnum);
    const uniqueEnums = uniqueItems(
        enums,
        (el) => (el.modelType.enumRef && el.modelType.enumRef.name) || '',
    ).map((e) => {
        return e.modelType.enumRef?.namespace
            ? e.modelType.enumRef.namespace
            : e.modelType.enumRef?.name;
    });

    if (uniqueEnums.length) {
        assert(
            props.swaggerModel.config.enumImportPath,
            "Enum import path can't be empty. Add to config",
        );
        imports.push(
            `import {${uniqueEnums.join(',')}} from \'${
                props.swaggerModel.parent.config.enumImportPath
            }\'`,
        );
    }

    const models = props.swaggerModel.properties.filter((f) => f.modelType.modelRef);
    const uniqueModels = uniqueItems(
        models,
        (el) => (el.modelType.modelRef && el.modelType.modelRef.name) || '',
    ).map((e) => e.modelType.modelRef?.name);

    if (uniqueModels.length) {
        assert(
            props.swaggerModel.config.modelImportPath,
            "Model import path can't be empty. Add to config",
        );
        imports.push(
            `import {${uniqueModels.join(',')}} from \'${
                props.swaggerModel.parent.config.modelImportPath
            }\'`,
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
