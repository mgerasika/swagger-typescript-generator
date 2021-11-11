import React from 'react';
import {DiffComponent} from "./diff";
import {SwaggerEnum} from "../swagger/models/swagger-enum";
import { SwaggerEnumAdapter } from '../components';

interface IProps {
    enums: SwaggerEnum[];
}

export const DemoAllEnumsComponent: React.FC<IProps> = (props) => {
    const renderCodegen = (swaggerEnum: SwaggerEnum) => {
        return (<SwaggerEnumAdapter swaggerEnum={swaggerEnum}></SwaggerEnumAdapter>)
    };
    const result = props.enums.map((def: SwaggerEnum, idx: number) => {
        return <DiffComponent key={def.getUniqueId()} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>
    })

    return props.enums.length ? (
        <>
            {result}
        </>
    ) : null;
}

