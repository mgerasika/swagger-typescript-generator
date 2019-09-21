import React from "react";
import {SwaggerMethod} from "../../model/swagger-method";

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export const ApiMethodReturnTypeComponent: React.FC<IProps> = (props) => {
    if (props.swaggerMethod.responseIsVoid) {
        return (<>{'AxiosPromise<void>'}</>);
    }
    const arraySymbol = props.swaggerMethod.responseIsArray ? '[]' : '';
    return (<>{`AxiosPromise<${props.swaggerMethod.responseType}${arraySymbol}>`}</>);
}
