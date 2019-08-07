import React, {ReactNode} from 'react';
import Diff from "./diff";
import {GenerateClass} from "../ts-generator/class/generate-class";
import {SwaggerClass} from "../model/swagger-class";

interface IProps {
    paths: SwaggerClass[];
    children?: ReactNode;
}

const ApiClasses: React.FC<IProps> = (props) => {
    const renderCodegen = (path: SwaggerClass) => {
        return (<GenerateClass swaggerClass={path}></GenerateClass>)
    };
    const result = props.paths.map((def: SwaggerClass) => {
        return <Diff key={def.name} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>
    })

    return (
        <>
            <h6 className={'pl-3'}>Api:</h6>
            {result}
        </>
    );
}

export default ApiClasses;


