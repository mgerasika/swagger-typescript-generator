import React from 'react';
import {customPlugins} from "./custom-plugins";
import { SwaggerRootComponent } from '.';

export * from './custom-plugins';
export * from '../demo/api-classes';
export * from '../demo/api-model-definitions';
export * from '../demo/diff';
export * from './swagger-root';

export const SwaggerDemoComponent: React.FC = () => {
    return (
        <div>
            <SwaggerRootComponent plugin={customPlugins}/>
        </div>
    );
}
