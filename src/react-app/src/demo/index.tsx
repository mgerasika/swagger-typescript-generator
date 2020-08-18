import React from 'react';
import {customPlugins} from "./custom-plugins";
import { SwaggerRootComponent } from '.';
import {createCustomUtilsFactory} from "./custom-utils";

export * from './custom-plugins';
export * from './api-all-classes';
export * from './api-all-path';
export * from './api-all-enums';
export * from './api-all-models-definitions';
export * from '../demo/diff';
export * from './swagger-root';
export * from '../components/swagger-panel';
export * from './custom-utils';

export const SwaggerDemoComponent: React.FC = () => {
    return (
        <div>
            <SwaggerRootComponent plugin={customPlugins} createCustomUtilsFactory={createCustomUtilsFactory}/>
        </div>
    );
}
