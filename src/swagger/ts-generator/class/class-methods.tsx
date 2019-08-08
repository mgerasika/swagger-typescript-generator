import React from "react";
import {MethodDefinition} from "../method/method-definition";
import {SwaggerMethod} from "../../model/swagger-method";
import {SwaggerClass} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const ClassMethods: React.FC<IProps> = (props) => {
    const methods = props.swaggerClass.methods.map((method: SwaggerMethod) => {
        return (<MethodDefinition key={method.name} swaggerMethod={method}/>)
    });

    return (
        <>
            {methods}
        </>
    );
}
