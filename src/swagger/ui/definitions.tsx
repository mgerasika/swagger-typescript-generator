import React, {ReactNode} from 'react';
import Diff from "./diff";
import {GenerateDefinition} from "../ts-generator/definitions/generate-definitions";
import {SwaggerDefinition} from "../model/swagger-definition";

interface IProps {
    definitions: SwaggerDefinition[];
    children?: ReactNode;
}

const Definitions: React.FC<IProps> = (props) => {
    const renderCodegen = (def: SwaggerDefinition) => {
        return (<GenerateDefinition definition={def}></GenerateDefinition>)
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

export default Definitions;


