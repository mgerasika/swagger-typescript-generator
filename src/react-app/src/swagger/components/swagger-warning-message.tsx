import React from 'react';
import {SwaggerClass, SwaggerDoc, SwaggerEnum, SwaggerModel} from "../models";
import {SwaggerModelContent} from "./model";
import {SwaggerApiClassContent} from "./api-class";
import {uniqueItems} from "../utils";
import {Namespace} from "../namespace";
import {SwaggerEnumContentAdapter} from "./enum";

interface IProps {
    doc: SwaggerDoc;
}

export const SwaggerWarningMessageAdapter = (props: IProps) => {
    return (
        <>
            {props.doc.components.renderWarningMessage(
                Component, {
                    message: '/* This code generated with swagger-typescript-generator. Don\'t modify this file because it will be rewriten. */\n',
                    doc: props.doc
                })}
        </>
    );
}

export interface ISwaggerWarningMessageProps extends IProps {
    message: string;
}

const Component: React.FC<ISwaggerWarningMessageProps> = (props) => {
    return (
        <>
            {props.message}
        </>
    );
};


