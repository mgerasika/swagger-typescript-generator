import React from "react";
import {SwaggerClass} from "../../models/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const SwaggerApiClassNameAdapter = (props: IProps) => {
    return (
        <>
            {props.swaggerClass.components.renderApiClassName(
                Component, {
                    swaggerClass: props.swaggerClass,
                })}
        </>
    );
}

export interface ISwaggerApiClassNameProps extends IProps {
}

const Component: React.FC<ISwaggerApiClassNameProps> = (props) => {
    return (
        <>
            export class {props.swaggerClass.name}
        </>
    );
}
