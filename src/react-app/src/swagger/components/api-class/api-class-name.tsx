import React from "react";
import {SwaggerClass} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const ApiClassNameComponent: React.FC<IProps> = (props) => {
    return (
        <>
            class {props.swaggerClass.name}
        </>
    );
}
