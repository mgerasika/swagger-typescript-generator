import React from "react";
import {SwaggerMethod} from "../../model/swagger-method";
import {GenerateMethodReturnType} from "./generate-method-return-type";
import {GenerateMethodArguments} from "./generate-method-arguments";
import {GenerateMethodBody} from "./generate-method-body";

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export const GenerateMethod: React.FC<IProps> = (props) => {

    return (<>
        {'\t'}public {props.swaggerMethod.name}(<GenerateMethodArguments swaggerMethod={props.swaggerMethod}/>):<GenerateMethodReturnType swaggerMethod={props.swaggerMethod} />{'{\n'}
       <GenerateMethodBody swaggerMethod={props.swaggerMethod} />
        {'\t}\n'}
    </>);
}
