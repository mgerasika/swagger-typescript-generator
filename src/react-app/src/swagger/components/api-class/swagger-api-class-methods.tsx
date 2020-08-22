import React from "react";
import {SwaggerApiMethodAdatper,} from "../api-method/swagger-api-method";
import {SwaggerMethod} from "../../models/swagger-method";
import {SwaggerClass} from "../../models/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const SwaggerApiClassMethodAdapter = (props: IProps) => {
    return (
        <>
            {props.swaggerClass.components.renderApiClassMethod(
                Component, {
                    swaggerClass: props.swaggerClass,
                })}
        </>
    );
}

export interface ISwaggerApiClassMethodProps extends IProps {
}

const Component: React.FC<ISwaggerApiClassMethodProps> = (props) => {
    const methods = props.swaggerClass.methods.map((method: SwaggerMethod) => {
        return (<SwaggerApiMethodAdatper key={method.name} swaggerMethod={method}/>)
    });

    return (
        <>
            {methods}
        </>
    );
}
