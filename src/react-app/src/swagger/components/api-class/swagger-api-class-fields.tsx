import React from "react";
import {SwaggerClass} from "../../models/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const SwaggerApiClassFieldsAdapter = (props: IProps) => {
    return (
        <>
            {props.swaggerClass.components.renderApiClassFields(
                Component, {
                    swaggerClass: props.swaggerClass,
                })}
        </>
    );
}

export interface ISwaggerApiClassFieldsProps extends IProps {
}

const Component: React.FC<ISwaggerApiClassFieldsProps> = (props) => {
    return <>
        {'\t'}private _apiUrl:string; {'\n'}
    </>
}
