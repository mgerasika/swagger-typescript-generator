import React from 'react';
import {SwaggerEnum} from "../../models/swagger-enum";
import {SwaggerEnumContentAdapter} from "./swagger-enum-content";
import {SwaggerWarningMessageAdapter} from "../swagger-warning-message";

interface IProps {
    swaggerEnum: SwaggerEnum;
}

export const SwaggerEnumAdapter = (props: IProps) => {
    return (
        <>
            {props.swaggerEnum.components.renderEnum(
                Component, {
                    swaggerEnum: props.swaggerEnum,
                })}
        </>
    );
}

export interface ISwaggerEnumProps extends IProps {
}

const Component: React.FC<ISwaggerEnumProps> = (props) => {
    const {swaggerEnum} = props;

    return (
        <>
            <SwaggerWarningMessageAdapter doc={props.swaggerEnum.doc} />

            <SwaggerEnumContentAdapter swaggerEnum={swaggerEnum}/>
        </>
    );
};
