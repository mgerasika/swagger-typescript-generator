import React from 'react';
import {SwaggerDemoComponent} from '.';
import {exampleDocumentFactory} from "./example-documents-factory";
import {exampleComponentsFactory} from "./example-components-factory";

export * from './demo-all-classes';
export * from './demo-all-path';
export * from './demo-all-enums';
export * from './demo-all-models';
export * from '../demo/diff';
export * from '../demo/diff-single';
export * from './swagger-demo-component';
export * from '../components/bootstrap-panel';

const apiUrls = [
    'https://petstore.swagger.io/v2/swagger.json',
    'https://flipdish-yellow-team.azurewebsites.net/swagger/docs/private-v1.0',
    'https://flipdish-yellow-team.azurewebsites.net/swagger/docs/v1.0',
    'https://flipdish-green-team.azurewebsites.net/swagger/docs/private-v1.0',
    'https://flipdish-green-team.azurewebsites.net/swagger/docs/v1.0',
    'https://flipdish-blue-team.azurewebsites.net/swagger/docs/private-v1.0',
    'https://flipdish-blue-team.azurewebsites.net/swagger/docs/v1.0',
    'https://flipdish-orange-team.azurewebsites.net/swagger/docs/private-v1.0',
    'https://flipdish-orange-team.azurewebsites.net/swagger/docs/v1.0'
];

export const ExampleComponent: React.FC = () => {
    return (
        <div>
            <SwaggerDemoComponent
                apiUrls={apiUrls}
                createComponentsFactory={exampleComponentsFactory}
                createDocumentFactory={exampleDocumentFactory}
                createUtilsFactory={(baseUtils) => baseUtils}
            />
        </div>
    );
}
