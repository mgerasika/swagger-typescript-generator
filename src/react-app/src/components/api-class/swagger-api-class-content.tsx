import React from "react";
import { SwaggerApiClassFieldsAdapter } from "./swagger-api-class-fields";
import { SwaggerApiClassConstructorAdapter } from "./swagger-api-class-constructor";
import { SwaggerApiClassMethodsAdapter } from "./swagger-api-class-methods";
import { SwaggerApiClassNameAdapter } from "./swagger-api-class-name";
import { SwaggerApiClassInstanceAdapter } from "./swagger-api-class-instance";
import { SwaggerClass } from "../../swagger";

interface IProps {
  swaggerClass: SwaggerClass;
}

export const SwaggerApiClassContent: React.FC<IProps> = (props) => {

  return (
    <>
      <SwaggerApiClassNameAdapter swaggerClass={props.swaggerClass} />
      {"{\n"}
      <SwaggerApiClassFieldsAdapter swaggerClass={props.swaggerClass} />
      <SwaggerApiClassConstructorAdapter swaggerClass={props.swaggerClass} />
      <SwaggerApiClassMethodsAdapter swaggerClass={props.swaggerClass} />
      {"}\n"}
      <SwaggerApiClassInstanceAdapter swaggerClass={props.swaggerClass} />
    </>
  );
};
