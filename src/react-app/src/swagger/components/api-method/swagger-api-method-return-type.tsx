import React from "react";
import {SwaggerMethod} from "../../models/swagger-method";

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export const SwaggerApiMethodReturnTypeAdapter = (props: IProps) => {
    const getReturnType = () => {
        if (props.swaggerMethod.responseIsVoid) {
            return 'Promise<void>';
        }
        const arraySymbol = props.swaggerMethod.responseIsArray ? '[]' : '';
        return `Promise<${props.swaggerMethod.responseType}${arraySymbol}>`
    }

    return (
        <>
            {props.swaggerMethod.components.renderApiMethodReturnType(
                Component, {
                    returnType: getReturnType(),
                    swaggerMethod: props.swaggerMethod,
                })}
        </>
    );
}

export interface ISwaggerApiMethodReturnTypeProps extends IProps {
    returnType: string;
}

const Component: React.FC<ISwaggerApiMethodReturnTypeProps> = (props) => {
    return props.returnType ? (<>:{props.returnType}</>) : null;
}
