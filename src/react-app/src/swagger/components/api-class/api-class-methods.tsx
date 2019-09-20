import React from "react";
import {ApiMethodDefinitionComponent} from "../api-method/api-method-definition";
import {SwaggerMethod} from "../../model/swagger-method";
import {SwaggerClass} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const ApiClassMethodsComponent: React.FC<IProps> = (props) => {
    const methods = props.swaggerClass.methods.map((method: SwaggerMethod) => {
        return (<ApiMethodDefinitionComponent key={method.name} swaggerMethod={method}/>)
    });

    return (
        <>
            {methods}
        </>
    );
}
