import React from 'react';
import {customPlugins} from "./custom-plugins";
import {SwaggerDemoComponent} from '.';

export * from './custom-plugins';
export * from './demo-api-all-classes';
export * from './demo-api-all-path';
export * from './demo-api-all-enums';
export * from './demo-api-all-models-definitions';
export * from '../demo/diff';
export * from '../demo/diff-single';
export * from './swagger-demo-component';
export * from '../components/swagger-panel';

const apiUrls = [
    'https://petstore.swagger.io/v2/swagger.json',
    'https://flipdish-yellow-team-qa.azurewebsites.net/swagger/docs/private-v1.0',
    'https://flipdish-yellow-team-qa.azurewebsites.net/swagger/docs/v1.0'
];
export const ExampleComponent: React.FC = () => {
    return (
        <div>
            <SwaggerDemoComponent
                apiUrls={apiUrls}
                createComponentsFactory={(baseComponents)=>baseComponents}
                createUtilsFactory={(baseUtils) => baseUtils}
                createDocumentFactory={(baseDocument) => baseDocument}/>
        </div>
    );
}
