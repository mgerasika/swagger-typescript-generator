import React from "react";
import {SwaggerClass} from "../../model/swagger-class";

interface IProps {
    swaggerClass: SwaggerClass;
}

export const ClassFields: React.FC<IProps> = (props) => {
    return <>
        {'\t'}public requestService:IRequestService; {'\n'}
    </>
}
