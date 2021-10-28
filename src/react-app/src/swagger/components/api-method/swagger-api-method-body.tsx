import React from "react";
import { SwaggerMethod } from "../../models/swagger-method";
import { EParameterIn, SwaggerMethodParameter } from "../../models";

interface IProps {
  swaggerMethod: SwaggerMethod;
}

export const SwaggerApiMethodBodyAdapter = (props: IProps) => {
  const getRequestServiceParams = (): string[] => {
    const result = props.swaggerMethod.parameters
      .filter(
        (parameter: SwaggerMethodParameter) =>
          parameter.in === EParameterIn.body
      )
      .map((parameter: SwaggerMethodParameter) => {
        return parameter.name;
      });

    if (props.swaggerMethod.isFileUpload) {
      result.push("formData");
    }
    result.unshift("url");
    result.push("options");
    return result;
  };

  return (
    <>
      {props.swaggerMethod.components.renderApiMethodBody(Component, {
        requestServiceParams: getRequestServiceParams(),
        swaggerMethod: props.swaggerMethod,
      })}
    </>
  );
};

export interface ISwaggerApiMethodBodyProps extends IProps {
  requestServiceParams: string[];
}

const Component: React.FC<ISwaggerApiMethodBodyProps> = (props) => {
  const getFormDataScript = () => {
    const formDataParameters = props.swaggerMethod.parameters
      .filter(
        (parameter: SwaggerMethodParameter) =>
          parameter.in === EParameterIn.formData
      )
      .map((parameter: SwaggerMethodParameter) => parameter);

    if (formDataParameters.length) {
      return (
        <>
          {"\t\t"}const formData = new FormData();{"\n"}
          {formDataParameters.map((param) => (
            <React.Fragment key={param.name}>
              {"\t\t"}formData.append('{param.name}',{param.name}){"\n"}
            </React.Fragment>
          ))}
        </>
      );
    }
    return "";
  };

  const getUrlBody = () => {
    const result = props.swaggerMethod.url.replace(/{/g, "${");
    // eslint-disable-next-line no-template-curly-in-string
    return "${this._apiUrl}" + `${result}`;
  };
  const getQueryBody = () => {
    const queryArguments = props.swaggerMethod.parameters.filter(
      (p) => p.in === EParameterIn.query
    );
    const query = queryArguments
      .map(
        (query) =>
          `'${
            query.name
          }':${props.swaggerMethod.utils.escapeMethodQueryParameterName(
            query.name
          )}Query`
      )
      .join(",");
    return `di.utilsService.toQueryString({${query}})`;
  };

  const methodName = props.swaggerMethod.isFileUpload
    ? "upload"
    : props.swaggerMethod.httpMethod;
  const hasQueryParameters = props.swaggerMethod.parameters.some(
    (p) => p.in === EParameterIn.query
  );

  return (
    <>
      {hasQueryParameters && (
        <>
          {" "}
          {"\t\t"}const queryStr = {getQueryBody()};{"\n"}
        </>
      )}
      {hasQueryParameters ? (
        <>
          {"\t\t"}const url = di.utilsService.combineUrlAndQuery(`{getUrlBody()}
          `,queryStr);{"\n"}
        </>
      ) : (
        <>
          {"\t\t"}const url = `{getUrlBody()}`;{"\n"}
        </>
      )}
      {getFormDataScript()}
      {
        <>
          {"\t\t"}return di.requestService.{methodName}(
          {props.requestServiceParams.join(",")});
        </>
      }
    </>
  );
};
