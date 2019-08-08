import React from "react";
import {SwaggerMethod} from "../../model/swagger-method";
import {MethodReturnType} from "./method-return-type";
import {MethodArguments} from "./method-arguments";
import {MethodBody} from "./method-body";

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export const MethodDefinition: React.FC<IProps> = (props) => {

    return (<>
        {'\t'}public {props.swaggerMethod.name}(<MethodArguments swaggerMethod={props.swaggerMethod}/>):<MethodReturnType swaggerMethod={props.swaggerMethod} />{'{\n'}
       <MethodBody swaggerMethod={props.swaggerMethod} />
        {'\t}\n'}
    </>);
}
