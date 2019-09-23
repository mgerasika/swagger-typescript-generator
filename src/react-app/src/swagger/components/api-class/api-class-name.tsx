import React from "react";
import {SwaggerClassModel} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClassModel;
}

export const ApiClassNameComponent: React.FC<IProps> = (props) => {
    return (
        <>
            class {props.swaggerClass.name}
        </>
    );
}
