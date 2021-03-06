import React from 'react';
import {SwaggerClass, SwaggerDoc, SwaggerMethod} from '../../models';
import {IUrlInfo} from '../../models/url-info';
import {SwaggerWarningMessageAdapter} from "../swagger-warning-message";

interface IProps {
    doc: SwaggerDoc;
    classes: SwaggerClass[];
}

export const SwaggerAllUrlsComponent2 = (props: IProps) => {
    const urls: IUrlInfo[] = [];
    props.classes.forEach((def: SwaggerClass) => {
        def.methods.forEach((method: SwaggerMethod) => {
            urls.push(method.getUrlInfo());
        });
    });

    return (
        <>
            {props.doc.components.renderAllUrls(
                Component, {
                    urls: urls,
                    doc: props.doc,
                    classes: props.classes,
                })}
        </>
    );
}


export interface ISwaggerAllUrlsProps extends IProps {
    urls: IUrlInfo[];
}

const Component: React.FC<ISwaggerAllUrlsProps> = (props) => {
    const result = props.urls.map((def: IUrlInfo, index: number) => {
        const isLast = index === props.urls.length - 1;
        const renderComa = !isLast && ',';
        return (<span key={`${def.name}${index}`}>{'\t'}{def.name}:'{def.url}'{renderComa}{'\n'}</span>);
    });
    return (
        <>
            <SwaggerWarningMessageAdapter doc={props.doc} />
            export const API_URLS = {'{\n'} {result}
            {'};\n'}
        </>
    );
};


