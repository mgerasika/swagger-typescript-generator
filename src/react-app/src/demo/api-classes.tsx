import React, {ReactNode} from 'react';
import {DiffComponent} from "./diff";
import {SwaggerClass} from "../swagger/model/swagger-class";
import { ApiClassDefinitionComponent } from '../swagger/components/api-class';
import {AllModelsExportComponent} from '../swagger/components/definitions';
import {AllApiClassesExportComponent} from '../swagger/components/api-class/all-class-export';

interface IProps {
    classes: SwaggerClass[];
}

export const ApiClassesComponent: React.FC<IProps> = (props) => {
    const renderCodegen = (swaggerClass: SwaggerClass) => {
        return (<ApiClassDefinitionComponent swaggerClass={swaggerClass}></ApiClassDefinitionComponent>)
    };
    const result = props.classes.map((def: SwaggerClass) => {
        return <DiffComponent key={def.name} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>
    })

    const renderAllClassesExport = <AllApiClassesExportComponent classes={props.classes} />

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

