import React from 'react';
import {SwaggerClassModel} from '../../model/swagger-class';
import {
    SwaggerDefinitionModel,
    SwaggerDefinitionProperty,
    SwaggerMethodModel,
    SwaggerMethodParameter
} from '../../model';
import {SwaggerEnumModel} from "../../model/swagger-enum";
import {uniqueItems} from "../../common";



interface IProps {
    swaggerDefinition: SwaggerDefinitionModel;
}

export const DefinitionImportComponent: React.FC<IProps> = (props) => {
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

    const enums  = props.swaggerDefinition.properties.filter(f=>f.isEnum);
    const uniqueEnums = uniqueItems(enums, el => el.enumModelRef && el.enumModelRef.name || '').map(e=>e.enumModelRef.name);

    if(uniqueEnums.length) {
        imports.push(`import {${uniqueEnums.join(',')}} from \'${props.swaggerDefinition.parent.config.enumImportPath}\'`);
    }

    const models  = props.swaggerDefinition.properties.filter(f=>f.subModelRef);
    const uniqueModels = uniqueItems(models, el => el.subModelRef && el.subModelRef.name || '').map(e=>e.subModelRef.name);

    if(uniqueModels.length) {
        imports.push(`import {${uniqueModels.join(',')}} from \'${props.swaggerDefinition.parent.config.modelImportPath}\'`);
    }
    const result = imports.map((val: string) => {
        return (<div key={val}>{val};{'\n'}</div>);
    });

    return (
        <>
            {result}
            {'\n'}
        </>
    );
};
