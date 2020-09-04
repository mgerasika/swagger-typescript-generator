import React from 'react';
import {SwaggerEnum} from "../../models/swagger-enum";
import {renderTabSymbol} from "../../namespace";
import {IEnumField} from "./swagger-enum-content";

interface IProps {
    swaggerEnum: SwaggerEnum;
    enumField: IEnumField;
}

export const SwaggerEnumFieldAdapter = (props: IProps) => {

    return (
        <>
            {props.swaggerEnum.components.renderEnumField(
                Component, {
                    enumField: props.enumField,
                    swaggerEnum: props.swaggerEnum,
                })}
        </>
    );
}

export interface ISwaggerEnumFieldProps extends IProps {
}

const Component: React.FC<ISwaggerEnumFieldProps> = (props) => {
    return (
        <>
            {props.enumField.name} = '{props.enumField.value}'
        </>
    );
};