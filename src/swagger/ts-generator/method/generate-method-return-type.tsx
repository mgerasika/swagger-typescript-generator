import React from "react";
import {SwaggerMethod} from "../../model/swagger-method";

interface IProps {
    swaggerMethod: SwaggerMethod;
}

export const GenerateMethodReturnType: React.FC<IProps> = (props) => {
    if (props.swaggerMethod.responseIsVoid) {
        return (<>{'AxiosPromise<void>'}</>);
    }
    return (<>{`AxiosPromise<${props.swaggerMethod.responseType}>`}</>);
}
