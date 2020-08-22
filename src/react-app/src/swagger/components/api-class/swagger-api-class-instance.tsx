import React from 'react';
import {SwaggerClass} from '../../models/swagger-class';
import {lowerlize} from '../../utils';

interface IProps {
    swaggerClass: SwaggerClass;
}

export const SwaggerApiClassInstanceAdapter = (props: IProps) => {
    return (
        <>
            {props.swaggerClass.components.renderApiClassInstance(
                Component, {
                    swaggerClass: props.swaggerClass,
                })}
        </>
    );
}

export interface ISwaggerApiClassInstanceProps extends IProps {
}

const Component: React.FC<ISwaggerApiClassInstanceProps> = (props) => {
    const {swaggerClass} = props;

    return (
        <>
            <span>export const {lowerlize(props.swaggerClass.name)} = new {props.swaggerClass.name}{"('"}{swaggerClass.parent.config.apiUrl}{"');\n"}</span>
        </>
    );
};
