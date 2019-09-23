import React, {useContext} from 'react';
import {SwaggerClassModel} from '../../model/swagger-class';
import {ApiClassFieldsComponent} from './api-class-fields';
import {ApiClassConstructorComponent} from './api-class-constructor';
import {ApiClassMethodsComponent} from './api-class-methods';
import {ApiClassNameComponent} from './api-class-name';
import {SwaggerContext} from '../../common';
import {lowerlize} from '../../utils';
import {ApiClassImportAdapter} from "./api-class-import";

interface IProps {
    swaggerClass: SwaggerClassModel;
}

export const ApiClassDefinitionComponent: React.FC<IProps> = (props) => {
    // const pluginContext = useContext(SwaggerContext);
    // const plugin = pluginContext.plugin;
    const {swaggerClass} = props;

    return (
        <>
            <ApiClassImportAdapter swaggerClass={props.swaggerClass}/>

            <ApiClassNameComponent swaggerClass={props.swaggerClass}/>
            {'{\n'}
            <ApiClassFieldsComponent swaggerClass={props.swaggerClass}/>
            <ApiClassConstructorComponent swaggerClass={props.swaggerClass}/>
            <ApiClassMethodsComponent swaggerClass={props.swaggerClass}/>
            {'}\n'}
            <span>export const {lowerlize(props.swaggerClass.name)} = new {props.swaggerClass.name}{'('}requestService{');\n'}</span>
        </>
    );
};
