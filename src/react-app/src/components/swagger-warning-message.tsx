import React from 'react';
import { SwaggerDoc } from '../swagger';

interface IProps {
    doc: SwaggerDoc;
}

export interface ISwaggerWarningMessageProps extends IProps {}

export const SwaggerWarningMessageAdapter: React.FC<ISwaggerWarningMessageProps> = (props) => {
    const message =
        "/* This code generated with swagger-typescript-generator. Don't modify this file because it will be rewriten. */\n";
    return <>{message}</>;
};
