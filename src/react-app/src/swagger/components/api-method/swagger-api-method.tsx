import React from "react";
import {SwaggerMethod} from "../../models/swagger-method";
import {SwaggerApiMethodReturnTypeAdapter} from "./swagger-api-method-return-type";
import {SwaggerApiMethodArgumentsAdapter} from "./swagger-api-method-arguments";
import {SwaggerApiMethodBodyAdapter} from "./swagger-api-method-body";
import {SwaggerApiMethodNameAdapter} from "./swagger-api-method-name";

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export const SwaggerApiMethodAdatper = (props: IProps) => {
    return (
        <>
            {props.swaggerMethod.components.renderApiMethod(
                Component, {
                    swaggerMethod: props.swaggerMethod,
                })}
        </>
    );
}

export interface ISwaggerApiMethodProps extends IProps {
}

const Component: React.FC<IProps> = (props) => {
    return (<>
        {'\t'}<SwaggerApiMethodNameAdapter swaggerMethod={props.swaggerMethod}/>(
        <SwaggerApiMethodArgumentsAdapter
            swaggerMethod={props.swaggerMethod}/>)
        <SwaggerApiMethodReturnTypeAdapter
            swaggerMethod={props.swaggerMethod}/>{'{\n'}
        <SwaggerApiMethodBodyAdapter swaggerMethod={props.swaggerMethod}/>
        {'\n\t}\n'}
    </>);
}
