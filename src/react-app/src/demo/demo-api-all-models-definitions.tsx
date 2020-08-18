import React, {ReactNode} from 'react';
import {DiffComponent} from "./diff";
import {SwaggerDefinitionModel} from "../swagger/model/swagger-definition-model";
import {ModelDefinitionComponent} from '../swagger/components/definitions/model-definition';
import {AllModelsExportComponent} from '../swagger/components/definitions';

interface IProps {
    definitions: SwaggerDefinitionModel[];
}

export const DemoApiAllModelDefinitionsComponent: React.FC<IProps> = (props) => {
    const renderCodegen = (def: SwaggerDefinitionModel) => {
        return (<ModelDefinitionComponent definition={def}></ModelDefinitionComponent>)
    };
    const result = props.definitions.map((def: SwaggerDefinitionModel) => {
        return <DiffComponent key={def.name} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>
    })


    return props.definitions.length ? (
        <>
            {result}
        </>
    ) : null;
}

