import React, {ReactNode} from 'react';
import Diff from "./diff";
import {ClassDefinition} from "../ts-generator/class/class-definition";
import {SwaggerClass} from "../model/swagger-class";

interface IProps {
    classes: SwaggerClass[];
}

const ApiClasses: React.FC<IProps> = (props) => {
    const renderCodegen = (swaggerClass: SwaggerClass) => {
        return (<ClassDefinition swaggerClass={swaggerClass}></ClassDefinition>)
    };
    const result = props.classes.map((def: SwaggerClass) => {
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


