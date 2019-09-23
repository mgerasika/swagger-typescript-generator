import React from 'react';
import {SwaggerClassModel} from '../../model/swagger-class';
import {SwaggerMethodModel} from '../../model';

interface IProps {
    swaggerClass: SwaggerClassModel;
}

export const ApiClassImportAdapter: React.FC<IProps> = (props) => {
    const imports = [
        'import {AxiosPromise} from \'axios\'',
        'import {IRequestService, requestService} from \'swagger-typescript-generator\''];

    return (
        <>
            {props.swaggerClass.plugin.apiClassImport(
                ApiClassImportComponent, {
                    swaggerClass: props.swaggerClass,
                    imports
                })}
        </>
    );
};

export interface IApiClassImportProps {
    swaggerClass: SwaggerClassModel;
    imports: string[];
}

export const ApiClassImportComponent: React.FC<IApiClassImportProps> = (props) => {
    const result = props.imports.map((val: string) => {
        return (<div key={val}>{val};{'\n'}</div>);
    });

    const responseTypes = props.swaggerClass.methods.map((method: SwaggerMethodModel) => {
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
