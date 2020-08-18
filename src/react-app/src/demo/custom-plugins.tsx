import React from 'react';
import {ApiClassImportComponent, IApiClassImportProps} from '../swagger/components';
import {defaultComponents, ISwaggerComponents} from '../swagger/common/default-components';

export const customPlugins: ISwaggerComponents = {
    ...defaultComponents,
    apiClassImport: (Component:React.FC<any>, props: IApiClassImportProps) => {
        const newProps:IApiClassImportProps = {
            ...props,
            imports:[...props.imports]
        }
        return <>
            <Component {...newProps}/>
        </>;
    }
};

