import React from 'react';
import {SwaggerClassModel, SwaggerMethodModel} from '../../model';
import {IUrlInfo} from '../../model/url-info';

interface IProps {
    classes: SwaggerClassModel[];
}

export const ApiUrlsComponent: React.FC<IProps> = (props) => {
    const urls: IUrlInfo[] = [];
    const warning = props.classes.length ? props.classes[0].utils.getWarningMessage() : "";
    props.classes.forEach((def: SwaggerClassModel) => {
        def.methods.forEach((method: SwaggerMethodModel) => {
            urls.push(method.getUrlInfo());
        });
    });

    const result = urls.map((def: IUrlInfo, index: number) => {
        const isLast = index === urls.length - 1;
        const renderComa = !isLast && ',';
        return (<span key={def.name}>{'\t'}{def.name}:'{def.url}'{renderComa}{'\n'}</span>);
    });
    return (
        <>
            {warning}
            export const API_URLS = {'{\n'} {result}
            {'};\n'}
        </>
    );
};


