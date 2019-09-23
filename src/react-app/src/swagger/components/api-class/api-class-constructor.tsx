import React from "react";
import {SwaggerClassModel} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClassModel;
}

export const ApiClassConstructorComponent: React.FC<IProps> = (props) => {
    return <>
        {'\t'}public constructor(service:IRequestService) {'{\n'}
        {'\t\t'}this._requestService = service; {'\n'}
        {'\t}\n'}
    </>
}
