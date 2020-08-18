import React, {ReactNode} from 'react';
import {DiffComponent} from "./diff";
import {SwaggerClassModel} from "../swagger/model/swagger-class";
import { ApiClassDefinitionComponent } from '../swagger/components/api-class';
import {AllModelsExportComponent} from '../swagger/components/definitions';
import {AllClassesExportComponent} from '../swagger/components/api-class/all-class-export';
import {ApiUrlsComponent} from '../swagger/components/urls';

interface IProps {
    classes: SwaggerClassModel[];
}

export const DemoApiAllClassesComponent: React.FC<IProps> = (props) => {
    const renderCodegen = (swaggerClass: SwaggerClassModel) => {
        return (<ApiClassDefinitionComponent swaggerClass={swaggerClass}></ApiClassDefinitionComponent>)
    };
    const result = props.classes.map((def: SwaggerClassModel) => {
        return <DiffComponent key={def.fileName} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>
    })

    return props.classes.length ? (
        <>
            {result}
        </>
    ) : null;
}

