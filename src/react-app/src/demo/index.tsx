import React, {ReactNode} from 'react';
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

interface IProps{
    style?:object;
    children:ReactNode;
}
const Customization = ({children,style}:IProps) => {
    return <span style={{border:'1px solid red',...style}}>{children}</span>
}
const customComponentsFactory = (baseComponents: ISwaggerComponents): ISwaggerComponents => ({
    ...baseComponents,
    renderApiMethod : (BaseComponent,props) => {
        return <Customization style={{display:'block'}}><BaseComponent {...props}/></Customization>
    },
    renderApiMethodName : (BaseComponent,props) => {
        return <Customization><BaseComponent {...props}/></Customization>
    },
    renderApiMethodArguments : (BaseComponent,props) => {
        return <Customization><BaseComponent {...props}/></Customization>
    },
    renderApiMethodReturnType: (BaseComponent,props) => {
        props.returnType = 'hello'
        return <Customization><BaseComponent {...props}/></Customization>
    },
    renderApiMethodBody : (BaseComponent,props) => {
        return <Customization style={{display:'inline-block'}}><BaseComponent {...props}/></Customization>
    },
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
