import React, {ReactNode} from 'react';
import {DiffComponent} from "./diff";
import {SwaggerClassModel} from "../swagger/model/swagger-class";
import { ApiClassDefinitionComponent } from '../swagger/components/api-class';
import {AllModelsExportComponent} from '../swagger/components/definitions';
import {ApiAllClassesExportComponent} from '../swagger/components/api-class/api-all-class-export';

interface IProps {
    classes: SwaggerClassModel[];
}

export const ApiClassesComponent: React.FC<IProps> = (props) => {
    const renderCodegen = (swaggerClass: SwaggerClassModel) => {
        return (<ApiClassDefinitionComponent swaggerClass={swaggerClass}></ApiClassDefinitionComponent>)
    };
    const result = props.classes.map((def: SwaggerClassModel) => {
        return <DiffComponent key={def.name} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>
    })

    const renderAllClassesExport = <ApiAllClassesExportComponent classes={props.classes} />

    return (
        <>
            <h5 className={'pl-3'}>Api examble for index.ts:</h5>
            <DiffComponent key={'index.ts'} obj1={{}} obj2={{}} obj3={renderAllClassesExport}/>
            <hr/>
            <h5 className={'pl-3'}>Api:</h5>
            {result}
        </>
    );
}

