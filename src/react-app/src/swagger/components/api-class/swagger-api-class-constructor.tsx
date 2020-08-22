import React from "react";
import {SwaggerClass} from "../../models/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const SwaggerApiClassConstructorAdapter = (props: IProps) => {
    return (
        <>
            {props.swaggerClass.components.renderApiClassConstructor(
                Component, {
                    swaggerClass: props.swaggerClass,
                })}
        </>
    );
}

export interface ISwaggerApiClassConstructorProps extends IProps {
}

const Component: React.FC<ISwaggerApiClassConstructorProps> = (props) => {
    return <>
        {'\t'}public constructor(apiUrl:string) {'{\n'}
        {'\t\t'}this._apiUrl = apiUrl; {'\n'}
        {'\t}\n'}
    </>
}
