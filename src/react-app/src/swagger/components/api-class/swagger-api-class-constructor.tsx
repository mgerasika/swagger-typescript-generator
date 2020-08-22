import React from "react";
import {SwaggerClass} from "../../models/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const SwaggerApiClassConstructorAdapter = (props: IProps) => {
    const lines = ['this._apiUrl = apiUrl'];
    const constructorArguments = ['apiUrl:string'];
    return (
        <>
            {props.swaggerClass.components.renderApiClassConstructor(
                Component, {
                    bodyLines: lines,
                    constructorArguments:constructorArguments,
                    swaggerClass: props.swaggerClass,
                })}
        </>
    );
}

export interface ISwaggerApiClassConstructorProps extends IProps {
    bodyLines:string[];
    constructorArguments:string[];
}

const Component: React.FC<ISwaggerApiClassConstructorProps> = (props) => {
    const bodyLines = props.bodyLines.map(bl => <React.Fragment key={bl}>{'\t\t'}{bl}{';\n'}</React.Fragment>)
    return <>
        {'\t'}public constructor(<>{props.constructorArguments.join(',')}</>) {'{\n'}
        {bodyLines}
        {'\t}\n'}
    </>
}
