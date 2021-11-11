import React from 'react';
import { SwaggerEnum } from '../../models/swagger-enum';
import { SwaggerEnumContentAdapter } from './swagger-enum-content';
import { SwaggerWarningMessageAdapter } from '../swagger-warning-message';

interface IProps {
    swaggerEnum: SwaggerEnum;
}

export interface ISwaggerEnumProps extends IProps {}

export const SwaggerEnumAdapter: React.FC<ISwaggerEnumProps> = (props) => {
    const { swaggerEnum } = props;

    return (
        <>
            <SwaggerWarningMessageAdapter doc={props.swaggerEnum.doc} />

            <SwaggerEnumContentAdapter swaggerEnum={swaggerEnum} />
        </>
    );
};
