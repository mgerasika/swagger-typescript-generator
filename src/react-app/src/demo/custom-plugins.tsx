import React from 'react';
import {ApiClassImportComponent, IApiClassImportAdapterProps} from '../swagger/components';
import {defaultPlugin, ISwaggerPlugin} from '../swagger/components/plugin';

export const customPlugins: ISwaggerPlugin = {
    ...defaultPlugin,
    // apiClassImport: (props: IApiClassImportAdapterProps) => {
    //     const imports = ['hi'];
    //     return <>
    //         <ApiClassImportComponent swaggerClass={props.swaggerClass} imports={imports}/>
    //     </>;
    // }
};

