import React from 'react';
import {SwaggerClass} from '../../models/swagger-class';
import {SwaggerApiClassImportAdapter} from "./swagger-api-class-import";
import {SwaggerApiClassContent} from "./swagger-api-class-content";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const SwaggerApiClassAdapter = (props: IProps) => {
    return (
        <>
            {props.swaggerClass.components.renderApiClass(
                Component, {
                    swaggerClass: props.swaggerClass,
                })}
        </>
    );
}

export interface ISwaggerApiClassProps extends IProps {
}

const Component: React.FC<ISwaggerApiClassProps> = (props) => {
    const {swaggerClass} = props;

    return (
        <>
            {swaggerClass.utils.getWarningMessage()}
            <SwaggerApiClassImportAdapter swaggerClass={props.swaggerClass}/>

            <SwaggerApiClassContent swaggerClass={props.swaggerClass}/>
        </>
    );
};
