import React from 'react';
import {SwaggerClass} from '../../model/swagger-class';
import {SwaggerMethod} from '../../model';

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

    const responseTypes = props.swaggerClass.methods.map((method: SwaggerMethod) => {
        return method.responseType;
    }).filter((filter: string | any) => filter);

    return (
        <>
            {result}
            <div>import {'{'} {responseTypes.join(',')} {'}'} from
                '{props.swaggerClass.parent.config.modelFolderPath}';
            </div>
            {'\n\n'}
        </>
    );
};
