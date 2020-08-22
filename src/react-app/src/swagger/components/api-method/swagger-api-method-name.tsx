import React from "react";
import {SwaggerMethod} from "../../models/swagger-method";

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export const SwaggerApiMethodNameAdapter = (props: IProps) => {
    return (
        <>
            {props.swaggerMethod.components.renderApiMethodName(
                Component, {
                    accessor: "public",
                    methodName: props.swaggerMethod.name,
                    swaggerMethod: props.swaggerMethod,
                })}
        </>
    );
}

export interface ISwaggerApiMethodNameProps extends IProps {
    accessor: string;
    methodName: string;
}

const Component: React.FC<ISwaggerApiMethodNameProps> = (props) => {
    return <>{props.accessor} {props.methodName}</>
}
