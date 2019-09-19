import React, {ReactNode} from 'react';
import {Diff} from "./diff";
import {SwaggerDefinition} from "../model/swagger-definition";
import {ModelDefinition} from '../ts-generator/definitions/model-definition';

interface IProps {
    definitions: SwaggerDefinition[];
}

export const Definitions: React.FC<IProps> = (props) => {
    const renderCodegen = (def: SwaggerDefinition) => {
        return (<ModelDefinition definition={def}></ModelDefinition>)
    };
    const result = props.definitions.map((def: SwaggerDefinition) => {
        return <Diff key={def.name} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>
    })

    return (
        <>
            <h6 className={'pl-3'}>Definitions:</h6>
            {result}
        </>
    );
}

