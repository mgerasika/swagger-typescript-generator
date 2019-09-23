import React from "react";
import {SwaggerClassModel} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClassModel;
}

export const ApiClassFieldsComponent: React.FC<IProps> = (props) => {
    return <>
        {'\t'}public _requestService:IRequestService; {'\n'}
    </>
}
