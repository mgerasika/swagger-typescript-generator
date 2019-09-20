import React from 'react';
import {SwaggerClass} from '../../model/swagger-class';

export interface IApiClassImportAdapterProps {
    swaggerClass: SwaggerClass;
}

interface IProps {
    swaggerClass: SwaggerClass;
    imports: string[];
}

export const ApiClassImportComponent: React.FC<IProps> = (props) => {
    const result = props.imports.map((val: string) => {
        return (<div key={val}>{val};{'\n'}</div>);
    });
    return (
        <>
            {result}
            {'\n'}
        </>
    );
};
