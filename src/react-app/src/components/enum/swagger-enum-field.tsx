import React from 'react';
import { SwaggerEnum } from '../../swagger';
import { IEnumField } from './swagger-enum-content';

interface IProps {
    swaggerEnum: SwaggerEnum;
    enumField: IEnumField;
}

export interface ISwaggerEnumFieldProps extends IProps {}

export const SwaggerEnumFieldAdapter: React.FC<ISwaggerEnumFieldProps> = (props) => {
    return (
        <>
            {props.enumField.name} = '{props.enumField.value}'
        </>
    );
};
