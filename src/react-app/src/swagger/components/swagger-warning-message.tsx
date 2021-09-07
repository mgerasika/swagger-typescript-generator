import React from "react";
import { SwaggerDoc } from "../models";

interface IProps {
  doc: SwaggerDoc;
}

export const SwaggerWarningMessageAdapter = (props: IProps) => {
  return (
    <>
      {props.doc.components.renderWarningMessage(Component, {
        message:
          "/* This code generated with swagger-typescript-generator. Don't modify this file because it will be rewriten. */\n",
        doc: props.doc,
      })}
    </>
  );
};

export interface ISwaggerWarningMessageProps extends IProps {
  message: string;
}

const Component: React.FC<ISwaggerWarningMessageProps> = (props) => {
  return <>{props.message}</>;
};
