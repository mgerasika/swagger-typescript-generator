import React from 'react';
import {ApiClassImportComponent, IApiClassImportProps} from '../swagger/components';
import {defaultPlugin, ISwaggerPlugin} from '../swagger/common/default-plugin';

export const customPlugins: ISwaggerPlugin = {
    ...defaultPlugin,
    apiClassImport: (component:any, props: IApiClassImportProps) => {
        const imports = [...props.imports, 'hi'];
        return <>
            <component swaggerClass={props.swaggerClass} imports={imports}/>
        </>;
    }
};

