import React from 'react';
import {customPlugins} from "./custom-plugins";
import { SwaggerRootComponent } from '.';
import {createCustomUtilsFactory} from "./custom-utils";

export * from './custom-plugins';
export * from '../demo/api-classes';
export * from '../demo/api-model-definitions';
export * from '../demo/diff';
export * from './swagger-root';
export * from './custom-utils';

export const SwaggerDemoComponent: React.FC = () => {
    return (
        <div>
            <SwaggerRootComponent plugin={customPlugins} createCustomUtilsFactory={createCustomUtilsFactory}/>
        </div>
    );
}
