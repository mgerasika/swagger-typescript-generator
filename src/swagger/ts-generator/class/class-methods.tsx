import React from "react";
import {GenerateMethod} from "../method/generate-method";
import {SwaggerMethod} from "../../model/swagger-method";
import {SwaggerClass} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const ClassMethods: React.FC<IProps> = (props) => {
    const methods = props.swaggerClass.methods.map((method: SwaggerMethod) => {
        return (<GenerateMethod key={method.name} swaggerMethod={method}/>)
    });

    return (
        <>
            {methods}
        </>
    );
}
