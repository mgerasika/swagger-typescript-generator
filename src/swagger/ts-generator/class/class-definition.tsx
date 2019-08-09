import React from "react";
import {SwaggerClass} from "../../model/swagger-class";
import {ClassImportAdapter} from "./class-import";
import {ClassFields} from "./class-fields";
import {ClassConstructor} from "./class-constructor";
import {ClassMethods} from "./class-methods";
import {ClassName} from "./class-name";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const ClassDefinition: React.FC<IProps> = (props) => {
    return (
        <>
            <ClassImportAdapter swaggerClass={props.swaggerClass}/>
            <ClassName swaggerClass={props.swaggerClass}/>
            {'{\n'}
            <ClassFields swaggerClass={props.swaggerClass}/>
            <ClassConstructor swaggerClass={props.swaggerClass}/>
            <ClassMethods swaggerClass={props.swaggerClass}/>
            {'}'}
        </>
    );
}