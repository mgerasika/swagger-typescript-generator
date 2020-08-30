import React from 'react';
import {DiffComponent} from "./diff";
import {SwaggerPath} from "../swagger/models/swagger-path";

interface IProps {
    paths: SwaggerPath[];
}

export const DemoAllPathComponent: React.FC<IProps> = (props) => {
    const result = props.paths.map((def: SwaggerPath) => {
        return <DiffComponent key={def.getUniqueId()} obj1={def.source} obj2={def} obj3={JSON.stringify(def, null, 2)}/>
    })

    return props.paths.length ? (
        <>
            {result}
        </>
    ) : null;
}

