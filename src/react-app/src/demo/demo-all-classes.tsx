import React from 'react';
import {DiffComponent} from "./diff";
import {SwaggerClass} from "../swagger/models/swagger-class";
import { SwaggerApiClassAdapter } from '../components';

interface IProps {
    classes: SwaggerClass[];
}

export const DemoAllClassesComponent: React.FC<IProps> = (props) => {
    const renderCodegen = (swaggerClass: SwaggerClass) => {
        return (<SwaggerApiClassAdapter swaggerClass={swaggerClass}></SwaggerApiClassAdapter>)
    };
    const result = props.classes.map((def: SwaggerClass) => {
        return <DiffComponent key={def.getUniqueId()} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>
    })

    return props.classes.length ? (
        <>

            {result}
        </>
    ) : null;
}

