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
    const enums  = props.swaggerDefinition.properties.filter(f=>f.isEnum);
    const uniqueEnums = uniqueItems(enums, el => el.enumModelRef && el.enumModelRef.name || '').map(e=>e.name);

    const imports = [];

    if(uniqueEnums.length) {
        imports.push(`import {${uniqueEnums.join(',')}} from \'${props.swaggerDefinition.parent.config.enumImportPath}\'`);
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
