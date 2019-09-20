import React, {useContext} from 'react';
import {SwaggerClass} from '../../model/swagger-class';
import {ApiClassFieldsComponent} from './api-class-fields';
import {ApiClassConstructorComponent} from './api-class-constructor';
import {ApiClassMethodsComponent} from './api-class-methods';
import {ApiClassNameComponent} from './api-class-name';
import {defaultPlugin} from '../plugin';
import {SwaggerContext} from '../../common';

interface IProps {
    swaggerClass: SwaggerClass;
}

export const ApiClassDefinitionComponent: React.FC<IProps> = (props) => {
    // const pluginContext = useContext(SwaggerContext);
    // const plugin = pluginContext.plugin;
    const {swaggerClass} = props;

    return (
        <>
            {defaultPlugin.apiClassImport({swaggerClass})}

            <ApiClassNameComponent swaggerClass={props.swaggerClass}/>
            {'{\n'}
            <ApiClassFieldsComponent swaggerClass={props.swaggerClass}/>
            <ApiClassConstructorComponent swaggerClass={props.swaggerClass}/>
            <ApiClassMethodsComponent swaggerClass={props.swaggerClass}/>
            {'}'}
            export const {props.swaggerClass} = new {props.swaggerClass}(requestService)
        </>
    );
};
