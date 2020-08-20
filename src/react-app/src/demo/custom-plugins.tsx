import React from 'react';
import {ISwaggerApiClassImportComponentProps} from '../swagger/components';
import {defaultComponents, ISwaggerComponents} from '../swagger/common/default-components';

export const customPlugins: ISwaggerComponents = {
    ...defaultComponents,
    renderApiClassImport: (Component: React.FC<any>, props: ISwaggerApiClassImportComponentProps) => {
        const newProps: ISwaggerApiClassImportComponentProps = {
            ...props,
            imports: [...props.imports]
        }
        return <>
            <Component {...newProps}/>
        </>;
    }
};

