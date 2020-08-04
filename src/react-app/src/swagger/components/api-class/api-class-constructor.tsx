import React from "react";
import {SwaggerClassModel} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClassModel;
}

export const ApiClassConstructorComponent: React.FC<IProps> = (props) => {
    return <>
        {'\t'}public constructor(apiUrl:string) {'{\n'}
        {'\t\t'}this._apiUrl = apiUrl; {'\n'}
        {'\t}\n'}
    </>
}
