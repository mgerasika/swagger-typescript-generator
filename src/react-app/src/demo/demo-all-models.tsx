import React from 'react';
import {DiffComponent} from "./diff";
import {SwaggerModel} from "../swagger/models/swagger-model";
import { SwaggerModelAdapter } from '../components';

interface IProps {
    definitions: SwaggerModel[];
}

export const DemoAllModelsComponent: React.FC<IProps> = (props) => {
    const renderCodegen = (def: SwaggerModel) => {
        return (<SwaggerModelAdapter swaggerModel={def}></SwaggerModelAdapter>)
    };
    const result = props.definitions.map((def: SwaggerModel) => {
        return <DiffComponent key={def.getUniqueId()} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>
    })


    return props.definitions.length ? (
        <>
            {result}
        </>
    ) : null;
}

