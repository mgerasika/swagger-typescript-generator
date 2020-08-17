import React, {ReactNode} from 'react';
import {DiffComponent} from "./diff";
import {SwaggerClassModel} from "../swagger/model/swagger-class";
import { ApiClassDefinitionComponent } from '../swagger/components/api-class';
import {AllModelsExportComponent} from '../swagger/components/definitions';
import {ApiAllClassesExportComponent} from '../swagger/components/api-class/api-all-class-export';
import {ApiUrlsComponent} from '../swagger/components/urls';
import {SwaggerPathModel} from "../swagger/model/swagger-path";

interface IProps {
    paths: SwaggerPathModel[];
}

export const ApiAllPathComponent: React.FC<IProps> = (props) => {
    const result = props.paths.map((def: SwaggerPathModel) => {
        return <DiffComponent key={def.name} obj1={def.source} obj2={def} obj3={JSON.stringify(def,null,2)}/>
    })

    return props.paths.length ? (
        <>
            {result}
        </>
    ) : null;
}

