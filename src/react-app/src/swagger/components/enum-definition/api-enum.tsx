import React, {useContext} from 'react';
import {SwaggerClassModel} from '../../model/swagger-class';
import {lowerlize} from '../../utils';
import {SwaggerEnumModel} from "../../model/swagger-enum";

interface IProps {
    swaggerEnum: SwaggerEnumModel;
}

export const EnumDefinitionComponent: React.FC<IProps> = (props) => {
    const {swaggerEnum} = props;

    return (
        <>
            {swaggerEnum.utils.getWarningMessage()}
            {swaggerEnum.name}
        </>
    );
};
