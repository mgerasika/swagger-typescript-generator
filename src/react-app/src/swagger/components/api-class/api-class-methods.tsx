import React from "react";
import {ApiMethodDefinitionComponent} from "../api-method/api-method-definition";
import {SwaggerMethodModel} from "../../model/swagger-method";
import {SwaggerClassModel} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClassModel;
}

export const ApiClassMethodsComponent: React.FC<IProps> = (props) => {
    const methods = props.swaggerClass.methods.map((method: SwaggerMethodModel) => {
        return (<ApiMethodDefinitionComponent key={method.name} swaggerMethod={method}/>)
    });

    return (
        <>
            {methods}
        </>
    );
}
