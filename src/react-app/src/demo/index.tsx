import React, {ReactNode} from 'react';
import {SwaggerDemoComponent} from '.';


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
    'https://flipdish-yellow-team-qa.azurewebsites.net/swagger/docs/private-v1.0',
    'https://flipdish-yellow-team-qa.azurewebsites.net/swagger/docs/v1.0'
];


export const ExampleComponent: React.FC = () => {
    return (
        <div>
            <SwaggerDemoComponent
                apiUrls={apiUrls}
                createUtilsFactory={(baseUtils) => baseUtils}
                createDocumentFactory={(baseDocument) => baseDocument}/>
        </div>
    );
}
