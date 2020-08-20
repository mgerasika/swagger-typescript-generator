import React from 'react';
import {SwaggerDemoComponent} from '.';
import {ISwaggerComponents} from "../swagger/common";

export * from './custom-plugins';
export * from './demo-all-classes';
export * from './demo-all-path';
export * from './demo-all-enums';
export * from './demo-all-models';
export * from '../demo/diff';
export * from '../demo/diff-single';
export * from './swagger-demo-component';
export * from '../components/swagger-panel';

const apiUrls = [
    'https://petstore.swagger.io/v2/swagger.json',
    'https://flipdish-yellow-team-qa.azurewebsites.net/swagger/docs/private-v1.0',
    'https://flipdish-yellow-team-qa.azurewebsites.net/swagger/docs/v1.0'
];

const customComponentsFactory = (baseComponents: ISwaggerComponents): ISwaggerComponents => ({
    ...baseComponents,
    renderApiMethodReturnType: (BaseComponent,props) => {
        props.returnType = 'hello'
        return <span style={{border:'1px solid red'}}><BaseComponent {...props}/></span>
    }
})
export const ExampleComponent: React.FC = () => {
    return (
        <div>
            <SwaggerDemoComponent
                apiUrls={apiUrls}
                createComponentsFactory={customComponentsFactory}
                createUtilsFactory={(baseUtils) => baseUtils}
                createDocumentFactory={(baseDocument) => baseDocument}/>
        </div>
    );
}
