import React, {useContext} from 'react';
import {SwaggerClassModel} from '../../model/swagger-class';
import {lowerlize} from '../../utils';
import {SwaggerEnumModel} from "../../model/swagger-enum";
import {SwaggerDefinitionProperty} from "../../model";

interface IProps {
    swaggerEnum: SwaggerEnumModel;
}

export const EnumDefinitionComponent: React.FC<IProps> = (props) => {
    const {swaggerEnum} = props;

    const fields = (props.swaggerEnum.values || []).map((p: string,idx) => {
        const separator =(props.swaggerEnum.values || []).length >idx+1 ? ',' : null;
        return (<span key={p}>{'\t'}{p}:'{p}'{separator}{'\n'}</span>);
    });
    return (
        <>
            {swaggerEnum.utils.getWarningMessage()}
            export enum {swaggerEnum.name}
            {'{'} {'\n'}{fields}
            {'}'}
        </>
    );
};
