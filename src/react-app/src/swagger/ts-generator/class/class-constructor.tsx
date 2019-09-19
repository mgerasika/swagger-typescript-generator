import React from "react";
import {SwaggerClass} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const ClassConstructor: React.FC<IProps> = (props) => {
    return <>
        {'\t'}public constructor(requestService:IRequestService) {'{\n'}
        {'\t\t'}this.requestService = requestService; {'\n'}
        {'\t}\n'}
    </>
}
