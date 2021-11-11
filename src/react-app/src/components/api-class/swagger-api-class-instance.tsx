import React from 'react';
import { SwaggerClass } from '../../swagger';
import { lowerlize } from '../../swagger/utils';

interface IProps {
    swaggerClass: SwaggerClass;
}

export interface ISwaggerApiClassInstanceProps extends IProps {}

export const SwaggerApiClassInstanceAdapter: React.FC<ISwaggerApiClassInstanceProps> = (props) => {
    const { swaggerClass } = props;

    return (
        <>
            <span>
                export const {lowerlize(props.swaggerClass.name)} = new {props.swaggerClass.name}
                {"('"}
                {swaggerClass.parent.config.apiUrl}
                {"');\n"}
            </span>
        </>
    );
};
