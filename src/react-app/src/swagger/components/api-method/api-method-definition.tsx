import React from "react";
import {SwaggerMethodModel} from "../../model/swagger-method";
import {ApiMethodReturnTypeComponent} from "./api-method-return-type";
import {ApiMethodArgumentsComponent} from "./api-method-arguments";
import {ApiMethodBodyComponent} from "./api-method-body";

interface IProps {
    swaggerMethod: SwaggerMethodModel;
}

export const ApiMethodDefinitionComponent: React.FC<IProps> = (props) => {

    return (<>
        {'\t'}public {props.swaggerMethod.name}(<ApiMethodArgumentsComponent
        swaggerMethod={props.swaggerMethod}/>):<ApiMethodReturnTypeComponent
        swaggerMethod={props.swaggerMethod}/>{'{\n'}
        <ApiMethodBodyComponent swaggerMethod={props.swaggerMethod}/>
        {'\t}\n'}
    </>);
}
