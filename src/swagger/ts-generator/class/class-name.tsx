import React from "react";
import {SwaggerClass} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const ClassName: React.FC<IProps> = (props) => {
    return (
        <>
            export class {props.swaggerClass.name}
        </>
    );
}
