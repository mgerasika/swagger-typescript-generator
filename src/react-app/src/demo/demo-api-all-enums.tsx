import React, {ReactNode} from 'react';
import {DiffComponent} from "./diff";
import {SwaggerClassModel} from "../swagger/model/swagger-class";
import { ApiClassDefinitionComponent } from '../swagger/components/api-class';
import {AllModelsExportComponent} from '../swagger/components/definitions';
import {AllClassesExportComponent} from '../swagger/components/api-class/all-class-export';
import {ApiUrlsComponent} from '../swagger/components/urls';
import {SwaggerEnumModel} from "../swagger/model/swagger-enum";
import {EnumDefinitionComponent} from "../swagger/components/enum-definition/api-enum";

interface IProps {
    enums: SwaggerEnumModel[];
}

export const DemoApiAllEnumsComponent: React.FC<IProps> = (props) => {
    const renderCodegen = (swaggerEnum: SwaggerEnumModel) => {
        return (<EnumDefinitionComponent swaggerEnum={swaggerEnum}></EnumDefinitionComponent>)
    };
    const result = props.enums.map((def: SwaggerEnumModel,idx:number) => {
        return <DiffComponent key={`${def.name}_${idx}`} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>
    })

    return props.enums.length ? (
        <>
            {result}
        </>
    ) : null;
}

