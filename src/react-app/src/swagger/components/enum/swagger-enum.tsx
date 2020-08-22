import React from 'react';
import {SwaggerEnum} from "../../models/swagger-enum";
import {SwaggerEnumContent} from "./swagger-enum-content";

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

const Component: React.FC<IProps> = (props) => {
    const {swaggerEnum} = props;

    return (
        <>
            {swaggerEnum.utils.getWarningMessage()}

            <SwaggerEnumContent swaggerEnum={swaggerEnum}/>
        </>
    );
};
